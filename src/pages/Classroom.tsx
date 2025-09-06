// src/pages/Classroom.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClassroomModule from '../components/ClassroomModule';

export type Lesson = {
  id: string;
  title: string;
  duration?: string;
};

export type Course = {
  id: string;
  title: string;
  subtitle: string;        // one-line description shown on the card
  coverUrl: string;
  progress: number;        // 0..100
  lessons: Lesson[];
  embedUrl: string;        // used by the detail page
  supportingDoc: string;

  // locking
  isLocked?: boolean;
  lockRedirect?: string;
};

// ==== EXACT COURSE LIST (as requested) ====
const courses: Course[] = [
  {
    id: 'mm-os',
    title: 'Modern Maker OS',
    subtitle: 'Your operating system for maker growth.',
    coverUrl: '',
    progress: 0,
    lessons: [],
    embedUrl: 'https://www.youtube.com/embed/4n9wxnQlYq8',
    supportingDoc: '#',
    isLocked: false,
  },
  {
    id: 'msc',
    title: 'Micro Snack Cartel',
    subtitle: 'Daily one-bite content engine.',
    coverUrl: '',
    progress: 0,
    lessons: [],
    embedUrl: '',
    supportingDoc: '',
    isLocked: true,
    lockRedirect: 'https://boardroom.thrivecart.com/trial',
  },
  {
    id: 'pw',
    title: 'Power Writer',
    subtitle: 'Write faster, tighter, clearer.',
    coverUrl: '',
    progress: 0,
    lessons: [],
    embedUrl: '',
    supportingDoc: '',
    isLocked: true,
    lockRedirect: 'https://boardroom.thrivecart.com/trial',
  },
  {
    id: 'gdoc',
    title: 'G-Doc Offer Blueprint',
    subtitle: 'Build a G-Doc offer that sells.',
    coverUrl: '',
    progress: 0,
    lessons: [],
    embedUrl: '',
    supportingDoc: '',
    isLocked: true,
    lockRedirect: 'https://boardroom.thrivecart.com/trial',
  },
];

export default function Classroom() {
  const navigate = useNavigate();
  const { moduleIndex } = useParams();

  // ----- DETAIL VIEW (/classroom/:moduleIndex) -----
  if (typeof moduleIndex !== 'undefined') {
    const idx = Number(moduleIndex);
    const course = Number.isFinite(idx) ? courses[idx] : undefined;

    // Guard: bad index
    if (!course) {
      navigate('/classroom');
      return null;
    }

    // If locked, redirect to Thrivecart then bounce back home
    if (course.isLocked && course.lockRedirect) {
      window.open(course.lockRedirect, '_blank', 'noopener');
      navigate('/classroom');
      return null;
    }

    // Render the training module
    return (
      <ClassroomModule
        training={{
          title: course.title,
          description: course.subtitle,
          embedUrl: course.embedUrl,
          supportingDoc: course.supportingDoc || '#',
        }}
        onBack={() => navigate('/classroom')}
      />
    );
  }

  // ----- GRID VIEW (/classroom) -----
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold mb-6">Classroom</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c, idx) => (
            <div
              key={c.id}
              onClick={() => {
                if (c.isLocked && c.lockRedirect) {
                  window.open(c.lockRedirect, '_blank', 'noopener');
                  return;
                }
                navigate(`/classroom/${idx}`);
              }}
              className="cursor-pointer rounded-2xl overflow-hidden bg-white border shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Black header area */}
              <div className="relative h-44 bg-black text-white grid place-items-center text-2xl font-semibold">
                {c.title}
                {/* Lock overlay */}
                {c.isLocked && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-1">
                    <div className="text-2xl">🔒</div>
                    <div className="text-sm opacity-90">Upgrade to Access</div>
                  </div>
                )}
              </div>

              {/* Footer: title + one-line subtitle */}
              <div className="p-5">
                <div className="text-xl font-semibold text-gray-900">{c.title}</div>
                <div className="text-sm text-gray-500 mt-1">{c.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
