"use client";

import React from "react";
import { ShowroomChatbot, ShowroomChatbotProps } from "./ShowroomChatbot";

export const WhatsAppInquiryPill: React.FC<ShowroomChatbotProps> = (props) => {
  return <ShowroomChatbot {...props} />;
};

export { ShowroomChatbot };
