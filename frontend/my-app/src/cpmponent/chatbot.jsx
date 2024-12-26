import React, { useEffect } from 'react';

function chatbot() {
  useEffect(() => {
    // Dynamically load the chatbot script
    const script1 = document.createElement('script');
    script1.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "YRolQYT51WJkE_fJ-kcAh",
        domain: "www.chatbase.co"
      };
    `;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = "https://www.chatbase.co/embed.min.js";
    script2.chatbotId = "YRolQYT51WJkE_fJ-kcAh";
    script2.domain = "www.chatbase.co";
    script2.defer = true;
    document.body.appendChild(script2);

    // Clean up the scripts when component is unmounted
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="absolute flex flex-wrap gap-20 top-20 justify-around p-10 left-0 z-[3] w-full">
      {/* <h1 className="text-xl font-bold">Hello Summer</h1> */}

      {/* Add chatbot iframe */}
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/YRolQYT51WJkE_fJ-kcAh"
        width="40%"
        style={{ height: '100%', minHeight: '700px'}}
        frameBorder="0"
        title="Chatbot"
      ></iframe>
    </div>
  );
}

export default chatbot;
