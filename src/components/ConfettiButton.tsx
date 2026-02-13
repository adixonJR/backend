import confetti from "canvas-confetti";


export default function ConfettiButton() {
const fire = () => {
confetti({ particleCount: 200, spread: 90, origin: { y: 0.7 } });
};


return (
<button
onClick={fire}
className="bg-pink-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-pink-700 transition"
>
Activar Confeti 🎉
</button>
);
}