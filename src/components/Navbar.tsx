import useCartStore from '../store/useCartStore';

export default function Navbar() {
  const amount = useCartStore((state) => state.amount);

  return (
    <nav className="bg-[#1e2a3a] text-white px-8 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold tracking-wide">Sooho Lee</h1>
      <div className="flex items-center gap-2 text-lg font-semibold">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 21a1 1 0 11-2 0 1 1 0 012 0zm10 0a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
        <span>{amount}</span>
      </div>
    </nav>
  );
}
