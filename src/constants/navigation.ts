import { 
  LayoutDashboard, 
  Briefcase, 
  Building2, 
  Calendar,
  Bot,
  LayoutTemplate, 
  User, 
  Settings, 
  Compass, 
  LogIn, 
  UserPlus 
} from 'lucide-react';
import { NavItem } from '../types';

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    title: 'Genel Bakış',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Başvuru özeti, istatistikler ve yaklaşan mülakatlar'
  },
  {
    title: 'Başvurular',
    href: '/applications',
    icon: Briefcase,
    description: 'Tüm iş başvurularınız ve durum takibi'
  },
  {
    title: 'Şirketler',
    href: '/companies',
    icon: Building2,
    description: 'Hedef şirketler ve incelemeler'
  },
  {
    title: 'Mülakatlar',
    href: '/interviews',
    icon: Calendar,
    description: 'Teknik mülakatlar, randevular ve vaka takvimi'
  },
  {
    title: 'AI Kariyer Asistanı',
    href: '/ai-assistant',
    icon: Bot,
    description: 'Özgeçmiş analizi, mülakat koçu ve kariyer rehberi'
  },
  {
    title: 'Şablonlar',
    href: '/templates',
    icon: LayoutTemplate,
    description: 'Özgeçmiş, ön mektup ve mülakat şablonları'
  },
];

export const SECONDARY_NAV_ITEMS: NavItem[] = [
  {
    title: 'Profilim',
    href: '/profile',
    icon: User,
    description: 'Kişisel bilgiler ve kariyer hedefleri'
  },
  {
    title: 'Ayarlar',
    href: '/settings',
    icon: Settings,
    description: 'Uygulama tercihleri ve bildirimler'
  },
];

export const AUTH_NAV_ITEMS: NavItem[] = [
  {
    title: 'Tanıtım',
    href: '/landing',
    icon: Compass,
    description: 'Kariyer Pusulası Karşılama Sayfası'
  },
  {
    title: 'Giriş Yap',
    href: '/login',
    icon: LogIn,
    description: 'Hesabınıza erişin'
  },
  {
    title: 'Kayıt Ol',
    href: '/register',
    icon: UserPlus,
    description: 'Yeni hesap oluşturun'
  },
];
