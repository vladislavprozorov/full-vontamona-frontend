/**
 * 💎 Motion Tokens
 * 
 * Централизованные тайминги для всех анимаций
 */

export const MOTION = {
  // Navigation
  forward: 300,
  backward: 150,
  
  // Interactions
  microConfirmation: 200,
  hover: 150,
  selectDelay: 450, // 🔥 UX контракт: пауза перед переходом
  selectInstant: 75, // 🔥 Instant feedback на клик
  
  // Submit
  minSubmitDelay: 400, // 🔥 Минимальная видимость спиннера (perceived quality)
  
  // States
  fadeIn: 200,
  fadeOut: 150,
  
  // Scale для tactile feedback
  scaleDown: 0.98,
} as const;

/**
 * Получить duration для Tailwind классов
 */
export function getDuration(isReturning: boolean): string {
  return isReturning ? `duration-${MOTION.backward}` : `duration-${MOTION.forward}`;
}
