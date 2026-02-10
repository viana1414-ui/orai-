import { Verse, NotificationMessage } from './types';

export const VERSES: Verse[] = [
  { text: "Orai sem cessar.", reference: "1 Tessalonicenses 5:17" },
  { text: "Entrega o teu caminho ao Senhor.", reference: "Salmos 37:5" },
  { text: "O Senhor é a minha força.", reference: "Salmos 28:7" },
  { text: "Buscai ao Senhor enquanto se pode achar.", reference: "Isaías 55:6" },
  { text: "Clama a mim, e responder-te-ei.", reference: "Jeremias 33:3" },
  { text: "O Senhor está perto.", reference: "Filipenses 4:5" },
  { text: "Deus é o nosso refúgio.", reference: "Salmos 46:1" },
  { text: "Tudo posso naquele que me fortalece.", reference: "Filipenses 4:13" },
  { text: "Em paz me deito e logo pego no sono.", reference: "Salmos 4:8" },
  { text: "Aquietai-vos e sabei que eu sou Deus.", reference: "Salmos 46:10" }
];

export const NOTIFICATION_MESSAGES: NotificationMessage[] = [
  { id: 1, text: "Reserve um momento para falar com Deus 🙏" },
  { id: 2, text: "Antes de continuar o dia, ore." },
  { id: 3, text: "A oração muda o coração." },
  { id: 4, text: "Deus está te esperando em oração." },
  { id: 5, text: "Pare por um instante e ore." },
  { id: 6, text: "Ore e entregue tudo nas mãos do Senhor." },
  { id: 7, text: "A paz começa na oração." },
  { id: 8, text: "Deus te ouve. Ore." },
  { id: 9, text: "Confie. Ore. Descanse." },
  { id: 10, text: "Um minuto de oração pode mudar o seu dia." }
];

export const APP_NAME = "Ora+";
export const APP_SLOGAN = "Mais oração, mais paz.";