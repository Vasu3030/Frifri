const ComingSoon = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-amber-100 to-orange-200 rounded-xl shadow-inner">
      <h1 className="text-4xl md:text-5xl font-bold text-[#8B4513] mb-3">
        🍽️ En préparation !
      </h1>
      <p className="text-lg md:text-xl text-[#5C4033] max-w-md mb-6">
        Cette fonctionnalité arrive bientôt. Revenez plus tard pour la découvrir.
      </p>
      <span className="text-5xl animate-bounce">⏳</span>
    </div>
  );
};

export default ComingSoon;
