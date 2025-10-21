import mongoose from "mongoose"; // Importa o mongoose para gerenciar a conexão com o MongoDB

export const connectDB = async () => { 
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI); // Conecta ao MongoDB usando a URI do .env
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error.message);
    process.exit(1); // Encerra o processo em caso de erro
  }
};
