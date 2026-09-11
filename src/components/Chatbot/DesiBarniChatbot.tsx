import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare, X, Send, ArrowRight } from 'lucide-react';
import {
  INITIAL_GREETING,
  INITIAL_QUICK_ACTIONS,
  type ChatbotAction,
} from './knowledgeBase';
import { generateChatbotResponse } from './intentEngine';
import './chatbot.css';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  actions?: ChatbotAction[];
}

export default function DesiBarniChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(
    INITIAL_QUICK_ACTIONS
  );

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'greeting',
      sender: 'assistant',
      text: INITIAL_GREETING,
      time: formatCurrentTime(),
      actions: [
        { label: 'Explore Pickles', path: '/pickles' },
        { label: 'Regional Flavours', path: '/regions' },
      ],
    },
  ]);

  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when chat window opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  function formatCurrentTime(): string {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: formatCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Realistic natural delay (450ms - 750ms)
    const delay = Math.floor(Math.random() * 300) + 450;

    setTimeout(() => {
      const response = generateChatbotResponse(query, {
        pathname: location.pathname,
      });

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        time: formatCurrentTime(),
        actions: response.actions,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);

      if (response.suggestions && response.suggestions.length > 0) {
        setCurrentSuggestions(response.suggestions);
      }
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleActionClick = (path: string) => {
    if (path.startsWith('#')) {
      const id = path.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  // Safe formatting helper to render bold, italic, and newlines
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lIdx) => {
      // Parse bold **text** and italic *text*
      const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
      return (
        <p key={lIdx} style={{ margin: '0 0 6px 0' }}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('*') && part.endsWith('*')) {
              return <em key={pIdx}>{part.slice(1, -1)}</em>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="desibarni-chatbot-root">
      {/* Floating Circular Launcher Button */}
      <button
        type="button"
        className="chatbot-launcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close DesiBarni Assistant' : 'Open DesiBarni Assistant'}
      >
        <span className="chatbot-launcher-pulse" />
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Floating Chat Window */}
      {isOpen && (
        <aside
          className="chatbot-window"
          role="dialog"
          aria-label="DesiBarni Assistant Chat"
        >
          {/* Header */}
          <header className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">देस</div>
              <div>
                <h3 className="chatbot-title">DesiBarni Assistant</h3>
                <div className="chatbot-status">
                  <span className="chatbot-status-dot" />
                  <span>Online · Artisanal Pickle Guide</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="chatbot-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close Assistant"
            >
              <X size={18} />
            </button>
          </header>

          {/* Messages Scrollable List */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-row ${msg.sender}`}>
                <div className="chat-bubble">{renderFormattedText(msg.text)}</div>

                {/* Render any action navigation buttons */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="chat-actions-container">
                    {msg.actions.map((act) => (
                      <button
                        key={act.path + act.label}
                        type="button"
                        className="chat-action-btn"
                        onClick={() => handleActionClick(act.path)}
                      >
                        {act.label} <ArrowRight size={13} />
                      </button>
                    ))}
                  </div>
                )}

                <span className="chat-time">{msg.time}</span>
              </div>
            ))}

            {/* Realistic Typing Indicator */}
            {isTyping && (
              <div className="chat-row assistant">
                <div className="chatbot-typing" aria-label="Assistant is typing">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Bar */}
          {currentSuggestions.length > 0 && !isTyping && (
            <div className="chatbot-suggestions">
              {currentSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="suggestion-chip"
                  onClick={() => handleSendMessage(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form
            className="chatbot-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
              ref={inputRef}
              type="text"
              className="chatbot-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about flavours, ingredients, ordering..."
              aria-label="Ask DesiBarni Assistant"
            />
            <button
              type="submit"
              className="chatbot-send-btn"
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </aside>
      )}
    </div>
  );
}
