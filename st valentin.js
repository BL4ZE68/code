import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ValentinePage() {
  const [message, setMessage] = useState("");
  const messages = [
    "Je t'aime plus que les étoiles dans le ciel!", 
    "Mon cœur bat pour toi chaque seconde.",
    "Tu es ma plus belle histoire d'amour!",
    "Avec toi, chaque jour est la St-Valentin!"
  ];

  const generateMessage = () => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4">
      <motion.h1 
        className="text-4xl font-bold text-red-600 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Joyeuse Saint-Valentin!
      </motion.h1>
      <Card className="p-6 bg-white shadow-lg rounded-2xl">
        <CardContent className="text-center">
          <motion.p 
            className="text-lg text-gray-700 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {message || "Cliquez pour découvrir un message d'amour!"}
          </motion.p>
          <Button onClick={generateMessage} className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition">
            Découvrir un message 💖
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
