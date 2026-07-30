import { CoachSession, CareerGoal } from '@/types/aiCoach';
import { getUserStorageKey } from '@/utils/userStorageUtils';

const SESSIONS_KEY_BASE = 'kp_ai_coach_sessions_v1';
const GOALS_KEY_BASE = 'kp_ai_career_goals_v1';

const getSessionsKey = () => getUserStorageKey(SESSIONS_KEY_BASE);
const getGoalsKey = () => getUserStorageKey(GOALS_KEY_BASE);

function getDefaultGoals(): CareerGoal[] {
  return [
    {
      id: 'g-1',
      title: 'Bu Ay 15 Kaliteli İş Başvurusu Yap',
      targetCount: 15,
      currentProgress: 8,
      category: 'applications',
      targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completed: false,
    },
    {
      id: 'g-2',
      title: '5 Mülakat Randevusuna Katıl',
      targetCount: 5,
      currentProgress: 3,
      category: 'interviews',
      targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completed: false,
    },
    {
      id: 'g-3',
      title: '%15 İş Teklifi Oranına Ulaş',
      targetCount: 15,
      currentProgress: 12,
      category: 'success_rate',
      targetDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completed: false,
    },
  ];
}

export const aiCoachRepository = {
  getSessions(): CoachSession[] {
    try {
      const raw = localStorage.getItem(getSessionsKey());
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveSession(session: CoachSession): void {
    try {
      const list = this.getSessions();
      list.unshift(session);
      localStorage.setItem(getSessionsKey(), JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save coach session', e);
    }
  },

  deleteSession(id: string): void {
    const list = this.getSessions();
    const filtered = list.filter((s) => s.id !== id);
    localStorage.setItem(getSessionsKey(), JSON.stringify(filtered));
  },

  getGoals(): CareerGoal[] {
    try {
      const raw = localStorage.getItem(getGoalsKey());
      if (!raw) {
        const init = getDefaultGoals();
        localStorage.setItem(getGoalsKey(), JSON.stringify(init));
        return init;
      }
      return JSON.parse(raw);
    } catch {
      return getDefaultGoals();
    }
  },

  saveGoal(goal: Omit<CareerGoal, 'id' | 'completed'>): CareerGoal {
    const newGoal: CareerGoal = {
      ...goal,
      id: `goal-${Date.now()}`,
      completed: goal.currentProgress >= goal.targetCount,
    };

    const list = this.getGoals();
    list.unshift(newGoal);
    localStorage.setItem(getGoalsKey(), JSON.stringify(list));
    return newGoal;
  },

  toggleGoalCompleted(id: string): void {
    const list = this.getGoals();
    const target = list.find((g) => g.id === id);
    if (target) {
      target.completed = !target.completed;
      localStorage.setItem(getGoalsKey(), JSON.stringify(list));
    }
  },

  deleteGoal(id: string): void {
    const list = this.getGoals();
    const filtered = list.filter((g) => g.id !== id);
    localStorage.setItem(getGoalsKey(), JSON.stringify(filtered));
  },
};
