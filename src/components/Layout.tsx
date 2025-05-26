import Header from './Header.tsx';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
