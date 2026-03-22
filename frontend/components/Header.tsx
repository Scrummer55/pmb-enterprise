import React, { useState } from 'react';
import { Bell, Search, Plus, Settings, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  activeTab: string;
  onAddEmployee: () => void;
  notifications: Notification[];
  onNotificationMarkRead: (id: string) => void;
  onSearch: (term: string) => void;
  unreadCount: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  timestamp: Date;
  read: boolean;
}

const Header: React.FC<HeaderProps> = ({
  activeTab,
  onAddEmployee,
  notifications,
  onNotificationMarkRead,
  onSearch,
  unreadCount
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-l-green-500 bg-green-50';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      case 'error': return 'border-l-red-500 bg-red-50';
      case 'info': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'net geleden';
    if (diffMins < 60) return `${diffMins}m geleden`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h geleden`;
    return `${Math.floor(diffMins / 1440)}d geleden`;
  };

  return (
    <header className="bg-white border-b-4 border-black px-8 py-6 flex justify-between items-center z-40 sticky top-0">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <div className="h-12 w-1.5 bg-[#ED1C24]"></div>
        <div>
          <h2 className="text-4xl font-black text-black tracking-tighter uppercase leading-none">
            {activeTab.replace('-', ' ')}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-black/40">Status:</span>
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[9px] font-extrabold uppercase text-emerald-600">Live</span>
          </div>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="hidden lg:flex items-center border-4 border-black p-1">
        <div className="px-4 py-3 bg-black text-white">
          <Search size={18} strokeWidth={3} />
        </div>
        <input
          type="text"
          placeholder="ZOEKEN..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onSearch(e.target.value);
          }}
          className="px-6 py-3 font-black uppercase text-sm w-64 outline-none placeholder:text-black/20"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-4 border-4 border-black hover:bg-[#ED1C24] hover:text-white transition-all group"
          >
            <Bell size={22} strokeWidth={3} />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ED1C24] text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-96 bg-white border-4 border-black rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto"
              >
                <div className="p-6 border-b-2 border-black bg-black text-white">
                  <h3 className="text-lg font-black uppercase tracking-tight">Meldingen</h3>
                </div>

                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell size={32} className="text-black/10 mx-auto mb-4" />
                    <p className="text-black/60 font-bold">Geen meldingen</p>
                  </div>
                ) : (
                  <div className="divide-y-2 divide-black/10">
                    {notifications.map((notif) => (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 border-l-4 cursor-pointer hover:bg-black/2 transition-all ${getNotificationColor(notif.type)} ${
                          !notif.read ? 'font-bold' : ''
                        }`}
                        onClick={() => onNotificationMarkRead(notif.id)}
                      >
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex-1">
                            <h4 className="font-black text-sm uppercase tracking-tight text-black">
                              {notif.title}
                            </h4>
                            <p className="text-xs text-black/70 mt-1">{notif.message}</p>
                            <span className="text-[10px] text-black/50 font-bold uppercase tracking-widest mt-2 block">
                              {formatTime(notif.timestamp)}
                            </span>
                          </div>
                          {!notif.read && (
                            <div className="w-3 h-3 bg-[#ED1C24] rounded-full flex-shrink-0 mt-1"></div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Add Employee Button */}
        <button
          className="bg-black text-white px-8 py-4 font-black text-sm uppercase tracking-widest hover:bg-[#ED1C24] transition-all ams-shadow-hover flex items-center gap-3 border-4 border-black"
          onClick={onAddEmployee}
        >
          <Plus size={18} strokeWidth={4} />
          <span className="hidden sm:inline">Nieuwe</span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ED1C24] to-black text-white font-black text-lg flex items-center justify-center hover:shadow-lg transition-all border-4 border-black"
          >
            M
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-56 bg-white border-4 border-black rounded-xl shadow-2xl z-50"
              >
                <div className="p-4 border-b-2 border-black">
                  <p className="font-black text-sm uppercase">Medewerker</p>
                  <p className="text-xs text-black/60">medewerker@pmb.nl</p>
                </div>
                <button className="w-full px-6 py-4 text-left font-bold uppercase text-sm hover:bg-black/5 flex items-center gap-3 transition-all border-b-2 border-black/10">
                  <Settings size={18} />
                  Instellingen
                </button>
                <button className="w-full px-6 py-4 text-left font-bold uppercase text-sm hover:bg-[#ED1C24] hover:text-white flex items-center gap-3 transition-all text-red-600">
                  <LogOut size={18} />
                  Uitloggen
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(showNotifications || showUserMenu) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;

