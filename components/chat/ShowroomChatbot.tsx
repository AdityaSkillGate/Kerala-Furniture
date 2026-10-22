"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  MessageCircle,
  X,
  Minus,
  Send,
  Phone,
  MapPin,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Compass,
  ArrowUpRight,
} from "lucide-react";
import { BRAND_CONFIG, getWhatsAppInquiryUrl } from "@/data/brand";
import { useLanguage } from "@/lib/language-context";
import { ProductItem } from "@/data/products";
import {
  FAQ_DATABASE,
  SUGGESTED_FAQ_IDS,
  matchFAQQuery,
  getFallbackResponse,
  FAQAction,
} from "@/data/faq";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  actions?: FAQAction[];
}

export interface ShowroomChatbotProps {
  currentProduct?: ProductItem | null;
}

export const ShowroomChatbot: React.FC<ShowroomChatbotProps> = ({
  currentProduct,
}) => {
  const { t, lang } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const getInitialMessages = useCallback((): ChatMessage[] => [
    {
      id: "msg-welcome",
      sender: "assistant",
      text: t.chatbot.welcomeMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ], [t.chatbot.welcomeMessage]);

  const [messages, setMessages] = useState<ChatMessage[]>(getInitialMessages);

  // Sync welcome message if user toggles language before starting a chat
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === "msg-welcome") {
        return getInitialMessages();
      }
      return prev;
    });
  }, [lang, getInitialMessages]);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Focus management
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, isMinimized]);

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        launcherRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = (userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const matchResult = matchFAQQuery(trimmed, lang);

      let botResponse: ChatMessage;

      if (matchResult.item) {
        const answerText = lang === "ta" ? matchResult.item.answerTamil : matchResult.item.answer;
        botResponse = {
          id: `ast-${Date.now()}`,
          sender: "assistant",
          text: answerText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actions: matchResult.item.actions,
        };
      } else {
        const fallback = getFallbackResponse(lang);
        botResponse = {
          id: `ast-${Date.now()}`,
          sender: "assistant",
          text: fallback.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actions: fallback.actions,
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 450);
  };

  const handleSuggestedQuestionClick = (faqId: string) => {
    const faqItem = FAQ_DATABASE.find((item) => item.id === faqId);
    if (!faqItem) return;

    const questionText = lang === "ta" ? faqItem.questionTamil : faqItem.question;
    handleSendMessage(questionText);
  };

  const handleProductEnquiryClick = (product: ProductItem) => {
    const query =
      lang === "ta"
        ? `${product.tamilName || product.name} (${product.productTypeLabel}) பற்றிய விவரங்கள்`
        : `Tell me about ${product.name} (${product.productTypeLabel})`;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: "assistant",
        text:
          lang === "ta"
            ? `இந்த ${product.tamilName || product.name} பக்குவப்படுத்தப்பட்ட ${product.material} கொண்டு உருவாக்கப்பட்டுள்ளது.\n\nஅளவுகள்: ${product.dimensions}\nமாதிரி விலை: ${product.priceDisplay}\n\nகுறிப்பு எண்: ${product.id}. சங்கரன்கோவில் ஷோரூமில் இதன் இருப்பு மற்றும் மர மாதிரிகளை நேரில் பார்வையிடலாம்.`
            : `The ${product.name} is handcrafted from ${product.material} with ${product.finish}.\n\nDimensions: ${product.dimensions}\nDemo Price: ${product.priceDisplay}\nShowroom Reference: ${product.id}.\n\nYou can inspect the timber grain and test the seating comfort at our Sankarankovil showroom on Railway Feeder Road.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actions: [
          {
            label: "Enquire This Piece on WhatsApp",
            labelTamil: "வாட்ஸ்அப்பில் விசாரிக்க",
            type: "whatsapp",
            url: getWhatsAppInquiryUrl(product.name, product.productTypeLabel),
          },
          {
            label: "Call Showroom Desk",
            labelTamil: "ஷோரூமை அழைக்க",
            type: "call",
            phone: BRAND_CONFIG.primaryPhone.tel,
          },
        ],
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 400);
  };

  const handleResetConversation = () => {
    setMessages(getInitialMessages());
    inputRef.current?.focus();
  };

  return (
    <aside
      aria-label="Kerala Furniture FAQ Chatbot Assistant"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none"
    >
      {/* 1. Main Chat Window Panel */}
      {isOpen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="false"
          aria-label={t.chatbot.headerTitle}
          className={cn(
            "pointer-events-auto w-[calc(100vw-2rem)] sm:w-[410px] md:w-[430px] bg-charcoal border border-champagne/40 shadow-luxury flex flex-col overflow-hidden transition-all duration-300 mb-3",
            isMinimized
              ? "h-14 sm:rounded-xs"
              : "h-[80vh] sm:h-[580px] max-h-[640px] rounded-t-xl sm:rounded-xs spring-btt-in"
          )}
        >
          {/* Header Bar */}
          <div className="px-4 py-3 bg-obsidian border-b border-white/10 flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-champagne/15 border border-champagne/30 flex items-center justify-center text-champagne shrink-0">
                <Sparkles className="w-4 h-4" />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-obsidian animate-pulse" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-sm font-medium text-white tracking-wide">
                    {t.chatbot.headerTitle}
                  </span>
                </div>
                <span className="text-[10px] text-sand/60 font-mono flex items-center gap-1">
                  <span>{t.chatbot.headerSubtitle}</span>
                  <span>•</span>
                  <span className="text-emerald-400">{t.chatbot.onlineBadge}</span>
                </span>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1 text-white/70">
              <button
                type="button"
                onClick={handleResetConversation}
                aria-label={t.chatbot.clearChatLabel}
                title={t.chatbot.clearChatLabel}
                className="p-1.5 hover:text-champagne hover:bg-white/5 rounded-xs transition-colors focus-ring"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                aria-label={isMinimized ? "Expand chat" : t.chatbot.minimizeChatLabel}
                title={isMinimized ? "Expand" : "Minimize"}
                className="p-1.5 hover:text-champagne hover:bg-white/5 rounded-xs transition-colors focus-ring"
              >
                {isMinimized ? <ChevronUp className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  launcherRef.current?.focus();
                }}
                aria-label={t.chatbot.closeChatLabel}
                title={t.chatbot.closeChatLabel}
                className="p-1.5 hover:text-rose-400 hover:bg-white/5 rounded-xs transition-colors focus-ring"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Conversation History Body (Hidden when Minimized) */}
          {!isMinimized && (
            <>
              <div
                role="log"
                aria-live="polite"
                aria-relevant="additions"
                className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs sm:text-sm bg-obsidian/40 selection:bg-champagne selection:text-obsidian"
              >
                {/* Brand Source Notice Banner */}
                <div className="p-3 bg-white/5 border border-white/10 rounded-xs flex items-center gap-2 text-[11px] text-sand/70 font-mono">
                  <Compass className="w-3.5 h-3.5 text-champagne shrink-0" />
                  <span>{t.chatbot.disclaimer}</span>
                </div>

                {/* Messages List */}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex flex-col gap-1 max-w-[85%] animate-in fade-in duration-200",
                      msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "p-3.5 rounded-xs leading-relaxed whitespace-pre-line text-xs sm:text-[13px]",
                        msg.sender === "user"
                          ? "bg-champagne text-obsidian font-medium shadow-sm"
                          : "bg-charcoal text-sand/90 border border-white/10 shadow-sm"
                      )}
                    >
                      {msg.text}

                      {/* Bot Message Action Buttons */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-col gap-2">
                          {msg.actions.map((act, idx) => {
                            const actLabel = lang === "ta" ? act.labelTamil : act.label;

                            if (act.type === "call" && act.phone) {
                              return (
                                <a
                                  key={idx}
                                  href={act.phone}
                                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xs text-xs font-mono font-medium transition-colors"
                                >
                                  <Phone className="w-3 h-3 text-champagne" />
                                  <span>{actLabel}</span>
                                </a>
                              );
                            }

                            if (act.type === "whatsapp" && act.url) {
                              return (
                                <a
                                  key={idx}
                                  href={act.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-xs text-xs font-mono font-medium transition-colors shadow-xs"
                                >
                                  <MessageCircle className="w-3 h-3" />
                                  <span>{actLabel}</span>
                                </a>
                              );
                            }

                            if (act.type === "maps" && act.url) {
                              return (
                                <a
                                  key={idx}
                                  href={act.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-sand rounded-xs text-xs font-mono font-medium transition-colors"
                                >
                                  <MapPin className="w-3 h-3 text-champagne" />
                                  <span>{actLabel}</span>
                                  <ArrowUpRight className="w-3 h-3 ml-auto opacity-70" />
                                </a>
                              );
                            }

                            if (act.url) {
                              return (
                                <Link
                                  key={idx}
                                  href={act.url}
                                  onClick={() => setIsOpen(false)}
                                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-champagne rounded-xs text-xs font-mono font-medium transition-colors"
                                >
                                  <span>{actLabel}</span>
                                  <ArrowUpRight className="w-3 h-3 ml-auto opacity-70" />
                                </Link>
                              );
                            }

                            return null;
                          })}
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] text-white/40 font-mono px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="mr-auto p-3 bg-charcoal border border-white/10 rounded-xs flex items-center gap-1.5 text-sand/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-bounce [animation-delay:0.3s]" />
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions Section */}
              <div className="p-3 bg-charcoal/90 border-t border-white/10 shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-sand/60">
                    {t.chatbot.suggestedHeading}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-white/20">
                  {/* Optional Context-Aware Product Chip */}
                  {currentProduct && (
                    <button
                      type="button"
                      onClick={() => handleProductEnquiryClick(currentProduct)}
                      className="shrink-0 px-2.5 py-1 bg-champagne/15 border border-champagne text-champagne hover:bg-champagne hover:text-obsidian text-[11px] font-sans rounded-xs transition-colors flex items-center gap-1"
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>
                        {lang === "ta"
                          ? `${currentProduct.tamilName || currentProduct.name} பற்றி விசாரிக்க`
                          : `Ask about ${currentProduct.name}`}
                      </span>
                    </button>
                  )}

                  {/* Standard Suggested Questions */}
                  {SUGGESTED_FAQ_IDS.map((id) => {
                    const item = FAQ_DATABASE.find((q) => q.id === id);
                    if (!item) return null;

                    const label = lang === "ta" ? item.questionTamil : item.question;

                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => handleSuggestedQuestionClick(id)}
                        className="shrink-0 px-2.5 py-1 bg-white/5 border border-white/10 hover:border-champagne/50 hover:text-champagne text-sand/80 text-[11px] font-sans rounded-xs transition-colors"
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input & Send Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="p-3 bg-obsidian border-t border-white/10 flex items-center gap-2 shrink-0"
              >
                <input
                  ref={inputRef}
                  id="showroom-chat-input"
                  name="chatMessage"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t.chatbot.inputPlaceholder}
                  aria-label={t.chatbot.inputPlaceholder}
                  className="flex-1 bg-charcoal border border-white/20 px-3 py-2 text-xs text-white placeholder:text-sand/40 focus:outline-none focus:border-champagne rounded-xs"
                />

                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  aria-label={t.chatbot.sendButtonLabel}
                  className={cn(
                    "p-2 bg-champagne text-obsidian rounded-xs transition-all focus-ring shrink-0",
                    inputValue.trim()
                      ? "opacity-100 hover:bg-champagne-light shadow-xs"
                      : "opacity-40 cursor-not-allowed"
                  )}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {/* 2. Low-Profile Clean Cream-Colored Floating Card with Micro-Expand Transition */}
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          ref={launcherRef}
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            if (isMinimized) setIsMinimized(false);
          }}
          aria-expanded={isOpen}
          aria-label={isOpen ? t.chatbot.closeChatLabel : "Showroom Guide & FAQ"}
          className={cn(
            "group relative flex items-center gap-3 px-4 py-2.5 sm:px-4.5 sm:py-3 bg-[#F8F5EE] text-[#1A1816] font-sans text-xs tracking-wide font-medium shadow-luxury border border-[#D9D2C5] hover:border-champagne/70 transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-gold rounded-xs focus-ring cursor-pointer select-none",
            isOpen && "bg-champagne text-obsidian border-champagne"
          )}
        >
          {/* Subtle live indicator pulse */}
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
          </span>

          <MessageCircle className="w-4 h-4 text-walnut group-hover:text-obsidian transition-colors shrink-0" />

          {/* Label with micro-expand effect on hover */}
          <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#2C2723] group-hover:text-obsidian transition-colors">
            {isOpen ? (lang === "ta" ? "மூடுக (Close)" : "Close Guide") : "Showroom Guide & FAQ"}
          </span>

          {/* Micro expand chevron / sparkle */}
          <span className="text-[10px] text-walnut/60 font-mono transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </div>
    </aside>
  );
};
