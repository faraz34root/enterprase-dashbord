import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Box, Users, Package, Archive, BookOpen, ClipboardList, ScrollText, Building2, Clock } from 'lucide-react';

const NavDropdown = ({ 
  label, 
  isActive, 
  onMouseEnter, 
  onMouseLeave, 
  children 
}: { 
  label: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: React.ReactNode;
}) => (
  <div className="relative">
    <button
      className="px-3 py-2 rounded-md hover:bg-blue-700 flex items-center gap-1"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {label}
    </button>
    {isActive && (
      <div
        className="absolute left-0 mt-1 w-56 bg-white rounded-md shadow-lg py-1 text-gray-700 z-50"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </div>
    )}
  </div>
);

const NavLink = ({ to, icon: Icon, children }: { to: string; icon: React.ElementType; children: React.ReactNode }) => (
  <Link to={to} className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50">
    <Icon className="h-5 w-5 text-blue-600" />
    {children}
  </Link>
);

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Building2 className="h-8 w-8" />
              <span className="font-bold text-xl">Monolit 365</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-4">
              <NavDropdown
                label="Внесение данных"
                isActive={activeDropdown === 'data'}
                onMouseEnter={() => handleMouseEnter('data')}
                onMouseLeave={handleMouseLeave}
              >
                <NavLink to="/resources" icon={Box}>
                  Средства и материалы
                </NavLink>
                <NavLink to="/personnel" icon={Users}>
                  Кадры
                </NavLink>
              </NavDropdown>

              <NavDropdown
                label="Отчёт"
                isActive={activeDropdown === 'reports'}
                onMouseEnter={() => handleMouseEnter('reports')}
                onMouseLeave={handleMouseLeave}
              >
                <NavLink to="/reports/products" icon={Package}>
                  Готовые изделия
                </NavLink>
                <NavLink to="/reports/inventory" icon={Archive}>
                  Склад деталей
                </NavLink>
              </NavDropdown>

              <Link to="/analytics" className="px-3 py-2 rounded-md hover:bg-blue-700">
                Аналитика
              </Link>

              <NavDropdown
                label="Персонал"
                isActive={activeDropdown === 'personnel'}
                onMouseEnter={() => handleMouseEnter('personnel')}
                onMouseLeave={handleMouseLeave}
              >
                <NavLink to="/employees" icon={Users}>
                  Сотрудники
                </NavLink>
                <NavLink to="/timesheet" icon={Clock}>
                  Табель
                </NavLink>
              </NavDropdown>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-blue-700"
                onMouseEnter={() => handleMouseEnter('admin')}
                onMouseLeave={handleMouseLeave}
              >
                <Settings className="h-5 w-5" />
                <span>Админ панель</span>
              </button>
              {activeDropdown === 'admin' && (
                <div
                  className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg py-1 text-gray-700 z-50"
                  onMouseEnter={() => handleMouseEnter('admin')}
                  onMouseLeave={handleMouseLeave}
                >
                  <NavLink to="/reference" icon={BookOpen}>
                    Справочник
                  </NavLink>
                  <NavLink to="/journal" icon={ClipboardList}>
                    Журнал
                  </NavLink>
                  <NavLink to="/resources-journal" icon={ScrollText}>
                    Журнал средств и материалов
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;