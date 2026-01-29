import { ReactNode } from 'react';

export default function QuizLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
      {/* Нет футера - чистый luxury experience */}
    </>
  );
}
