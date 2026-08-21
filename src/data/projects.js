/* ============================================================
   Project content.
   Section shapes supported by CaseStudy.jsx:
     { title, paras: [html] }
     { title, lead, bullets: [html] }
     { title, probs: [[heading, html]] }
     { title, stack: [[tech, why]] }
   ============================================================ */

export const projects = [
  {
    slug: 'winbundle',
    num: '01',
    category: 'Fintech · VTU & prize draw',
    years: '2025 — 2026',
    name: 'WinBundle',
    role: 'Mobile developer · SaltinStein',
    tagline:
      'A bill-payment app where every purchase also buys you a lottery ticket — so the wallet, the ledger and the session all have to be right.',
    blurb:
      'Airtime, data, cable TV and electricity payments, where each purchase issues a ticket into a weekly draw. Built on BLoC with clean architecture per feature and a three-state session model.',
    tags: ['Flutter', 'BLoC', 'go_router', 'Dio', 'Clean Architecture'],
    store: {
      label: 'Live on Google Play',
      url: 'https://play.google.com/store/apps/details?id=com.darvin.winbundle',
    },
    ghost: 'iOS build ready',
    meta: [
      ['Type', 'Commercial product'],
      ['Company', 'SaltinStein Limited'],
      ['Platforms', 'Android · iOS'],
      ['Language', 'Dart'],
      ['State management', 'BLoC (flutter_bloc)'],
      ['Routing', 'go_router + ShellRoute'],
      ['Networking', 'Dio'],
      ['DI', 'get_it'],
      ['Features', '9 modules'],
      ['Status', 'Live on Google Play'],
    ],
    cards: ['wb-home', 'wb-buy', 'wb-tickets'],
    shots: [
      ['wb-home', 'Home · wallet & draw countdown'],
      ['wb-buy', 'Purchase · provider & amount'],
      ['wb-tickets', 'Draw · issued tickets'],
      ['wb-wallet', 'Wallet · ledger & refunds'],
      ['wb-lock', 'Locked session · re-authentication'],
    ],
    sections: [
      {
        title: 'What it is',
        paras: [
          'WinBundle is a Nigerian value-added-services app. Users top up a wallet, then buy airtime, data, cable TV or electricity through it. What makes it more than a bill-payment app is the draw mechanic: every purchase issues a ticket into a weekly prize draw, so spending people already do becomes an entry.',
        ],
        lead: 'Shipped features:',
        bullets: [
          '<strong>Bundle purchase</strong> across four categories — Airtime2Win, Data2Win, Cable2Win and Power2Win — with provider selection for all major Nigerian networks.',
          '<strong>Wallet</strong> with funding, spend balance and a full transaction ledger including refunds and reversals.',
          '<strong>Draw and tickets</strong> — issued tickets with status, a live countdown to the next draw, and winnings history.',
          '<strong>Authentication</strong> with phone-and-password sign-in, biometric unlock, and a transaction PIN separate from the login credential.',
          '<strong>Account</strong> — profile, notifications, business mode for resale pricing, and light/dark theming.',
        ],
      },
      {
        title: 'My role',
        paras: [
          'I built the mobile client. That covered the feature architecture, all state management, the networking and authentication layers, the security behaviour, and the multi-environment build setup — working against a backend service owned by another developer.',
        ],
      },
      {
        title: 'Architecture',
        paras: [
          'The app uses <strong>Clean Architecture applied per feature</strong> rather than per layer. Each of the nine features — authentication, products, wallet, transactions, draw, profile, notifications, settings and onboarding — owns its own <code>data / domain / presentation</code> tree. Nothing is shared except genuinely shared infrastructure.',
          'Data flows in one direction only: <code>UI → BLoC → Repository → DataSource → ApiService</code>. A widget never calls a repository and a BLoC never touches Dio. Because every feature has the same internal shape, moving between them requires no re-orientation.',
          '<strong>Navigation</strong> uses go_router with a <code>ShellRoute</code>, so the bottom navigation bar persists while nested routes swap beneath it — which also means deep links resolve into the correct tab with a sensible back stack.',
          '<strong>Environments</strong> are resolved at compile time. Dev, local and production are selected with <code>--dart-define</code> and read through <code>String.fromEnvironment</code>, so there is no runtime configuration file to mis-parse and no way for a debug build to point at the production wallet.',
        ],
      },
      {
        title: 'State management',
        paras: [
          'I used <strong>BLoC</strong> (<code>flutter_bloc</code>) throughout. For an app that moves money, the appeal is that every change of state is the result of a named event, which makes the sequence auditable and straightforward to test — you assert on emitted states rather than tapping through screens.',
          'The most interesting piece of state is the session. "Signed in or signed out" is the wrong model for a wallet app: people open it several times a day for a small top-up, so a full login every time is hostile, but leaving a funded session open is worse. So the session has <strong>three states</strong> — <code>authenticated</code>, <code>locked</code> and <code>unauthenticated</code>. Fifteen minutes of inactivity drops it to locked, recoverable with a password or biometric. An explicit sign-out drops it to unauthenticated and requires the full flow again.',
          'Session <em>identity</em> persists in encrypted storage independently of the JWTs, so the app remembers who you are without storing anything replayable. Every unlock still authenticates server-side. A Dio interceptor attaches the bearer token to each request and handles 401s by refreshing and replaying the original call, so the BLoC layer above it never needs to know that token expiry exists.',
        ],
      },
      {
        title: 'Stack',
        stack: [
          ['flutter_bloc', 'Event-driven state; every transition is named and testable'],
          ['go_router', 'Declarative routing with a ShellRoute for persistent bottom nav'],
          ['Dio', 'HTTP client with an interceptor for token attach and silent refresh'],
          ['get_it', 'Service location, so BLoCs receive repositories without manual wiring'],
          ['flutter_secure_storage', 'Keychain / EncryptedSharedPreferences for session identity'],
          ['local_auth', 'Optional biometric unlock on the lock screen'],
          ['safe_device', 'Root and jailbreak checks ahead of sensitive screens'],
          ['fl_chart', 'Spend and winnings visualisation'],
        ],
      },
      {
        title: 'Reflection',
        paras: [
          'The three-state session is the part I would carry into any wallet app unchanged — it solved a real tension between convenience and safety, and the pattern turned out to be simple once it was named properly.',
          'What I would do differently: write integration tests around the refresh interceptor first rather than last. It is the highest-risk code in the app and it was the last thing to get coverage.',
        ],
      },
    ],
  },

  {
    slug: 'learners-forge',
    num: '02',
    category: 'EdTech · Personal project',
    years: '2026',
    name: 'Learners Forge',
    role: 'Sole developer',
    tagline:
      'An exam-prep platform for Nigerian students, built on my own time — specified, architected and written end to end.',
    blurb:
      'Subscription exam prep for JAMB, WAEC, NECO and Post-UTME. Twelve feature modules on BLoC, with routing guards that make paywalled content genuinely unreachable.',
    tags: ['Flutter', 'BLoC', 'Route guards', 'Dio', 'Subscriptions'],
    store: null,
    ghost: 'v1.0.0 · Pre-release',
    ghost2: 'JAMB · WAEC · NECO · Post-UTME',
    meta: [
      ['Type', 'Personal project'],
      ['Platforms', 'Android · iOS'],
      ['Language', 'Dart'],
      ['State management', 'BLoC · bloc_concurrency'],
      ['Routing', 'go_router · dual guards'],
      ['Networking', 'Dio · ApiResult<T>'],
      ['DI', 'get_it'],
      ['Testing', 'bloc_test · mocktail'],
      ['Features', '12 modules'],
      ['Docs', '14 written specs'],
    ],
    cards: ['lf-explore', 'lf-plans', 'lf-splash'],
    shots: [
      ['lf-splash', 'Brand · forge your future'],
      ['lf-explore', 'Catalogue · categories & filters'],
      ['lf-plans', 'Plans · monthly & annual'],
      ['lf-profile', 'Profile · stats & subscription'],
    ],
    sections: [
      {
        title: 'What it is',
        paras: [
          'Learners Forge is a subscription learning platform for Nigerian students preparing for JAMB, WAEC, NECO and Post-UTME. Students subscribe, enrol in a subject, work through video lessons and written material, then test themselves against past questions and quizzes.',
        ],
        lead: 'Shipped features:',
        bullets: [
          '<strong>Course catalogue</strong> with category filters, sorting, ratings and lesson counts.',
          '<strong>Subscription</strong> — monthly and annual plans, checkout, and a paywall for locked content.',
          '<strong>Enrolment and My Courses</strong>, tracking which subjects a student is actively taking.',
          '<strong>Lesson player</strong> pairing video playback with HTML-rendered study material in one view.',
          '<strong>Quizzes</strong> over past questions, with scored results.',
          '<strong>Account</strong> — profile, learning stats, wishlist, support and dark mode.',
        ],
      },
      {
        title: 'My role',
        paras: [
          'Everything on the client. I reviewed the existing web product to keep the mobile flows in sync, wrote the specifications, designed the architecture, built all twelve feature modules, and defined the API contract for the backend to implement against.',
          'Working alone removes the reviewer who would normally catch a lazy decision, so I wrote <strong>fourteen specifications</strong> first — product overview, architecture, navigation, data models, per-feature behaviour, API contracts and design system — and treated those documents as the thing I had to argue with instead.',
        ],
      },
      {
        title: 'Architecture',
        paras: [
          'Twelve self-contained feature modules — onboarding, auth, profile, courses, enrolment, learning, quiz, subscription, dashboard, landing, wishlist and support — each following the same internal shape.',
          'I wrote the layering rules down as a table of what each layer <em>does</em> and what it <strong>never</strong> does. UI dispatches events and holds controllers, and never calls a repository. A BLoC handles events and emits state, and never touches <code>BuildContext</code>. Repositories map data models to domain entities, and never make HTTP calls. Services own transport, and never hold business logic.',
          '<strong>Guarded routing</strong> is the load-bearing decision. A subscription app leaks value in the gaps between screens — hiding a "Subscribe" button is not access control, because deep links and restored navigation state route straight around it. So two guards sit stacked in the GoRouter redirect: an auth guard, then a subscription guard. Curriculum, lesson, quiz and result routes require authenticated <em>and</em> subscribed <em>and</em> enrolled. Because the check lives in routing rather than in widgets, there is no path to a paid lesson that skips it.',
          'The UI and BLoC layers code against clean <strong>domain entities</strong> that I defined as the mobile-side source of truth, with the data layer adapting whatever JSON the API returns. Building the client ahead of a finished backend meant shape changes stopped at a single adapter rather than propagating through the app.',
          'Start-up is an explicit boot chain — load environment, initialise dependency injection, then <code>runApp</code> — with separate <code>main_dev</code> and <code>main_prod</code> entry points, so a misconfigured environment fails immediately instead of halfway through a session.',
        ],
      },
      {
        title: 'State management',
        paras: [
          'BLoC again, with <code>bloc_concurrency</code> where event ordering matters — dropping duplicate submissions on a quiz answer, and sequencing paginated catalogue loads so a fast scroll cannot interleave pages out of order.',
          'Every service call returns a uniform <code>ApiResult&lt;T&gt;</code>, so success and failure are handled the same way in every BLoC rather than scattering try/catch through repositories. Loading states use <code>shimmer</code> placeholders instead of spinners, because on a typical Nigerian mobile connection the loading state is a meaningful part of the experience rather than a flicker.',
          'Testing was set up from the first commit with <code>bloc_test</code> and <code>mocktail</code>, so BLoCs are verified against dispatched events and emitted states.',
        ],
      },
      {
        title: 'Stack',
        stack: [
          ['flutter_bloc + bloc_concurrency', 'State, with event transformers where ordering matters'],
          ['go_router', 'Routing, with stacked auth and subscription guards'],
          ['Dio', 'HTTP, wrapped in a uniform ApiResult<T>'],
          ['get_it', 'Dependency injection, initialised in the boot chain'],
          ['flutter_dotenv', 'Environment configuration per entry point'],
          ['flutter_secure_storage', 'Auth token storage'],
          ['youtube_player_iframe', 'Lesson video playback'],
          ['flutter_widget_from_html_core', 'Rendering study material alongside video'],
          ['shimmer', 'Skeleton loading states'],
          ['bloc_test + mocktail', 'BLoC unit testing from the first commit'],
        ],
      },
      {
        title: 'Reflection',
        paras: [
          'This is the project I would point at first, because every architectural decision in it is mine and written down. Putting access control in the router rather than the UI is the choice I am most confident about — it converts a class of bug into an impossibility.',
          'What building it alone taught me: specifications are not bureaucracy, they are the substitute for a colleague who asks awkward questions. The features I specced before coding took less total time than the ones I did not.',
        ],
      },
    ],
  },

  {
    slug: 'cashtoken',
    num: '03',
    category: 'Rewards · Multi-market',
    years: '2024 — 2026',
    name: 'CashToken Rewards',
    role: 'Mobile developer · CashToken Rewards Africa',
    tagline:
      'A rewards app live in two markets on both stores — and the codebase where I learned what inheriting other people’s decisions actually involves.',
    blurb:
      'Shopping with partner brands earns tokens redeemable against a weekly draw. An inherited production codebase where I refactored for performance, shipped features and owned releases.',
    tags: ['Flutter', 'Multi-market', 'Offline SQLite', 'Release engineering'],
    store: {
      label: 'Google Play & App Store',
      url: 'https://play.google.com/store/apps/details?id=com.cashtokenreward.app',
    },
    meta: [
      ['Type', 'Commercial product'],
      ['Company', 'CashToken Rewards Africa'],
      ['Team', 'Two developers'],
      ['Platforms', 'Android · iOS'],
      ['Markets', 'Nigeria · UK'],
      ['Environments', 'dev (SQLite) · staging · prod'],
      ['Backend', 'Five-host v2 API'],
      ['Status', 'Live on both stores'],
    ],
    cards: ['ct-discover', 'ct-rewards', 'ct-gift'],
    shots: [
      ['ct-discover', 'Discover · partner brands'],
      ['ct-rewards', 'Rewards · tokens & weekly draw'],
      ['ct-gift', 'Gifting · send tokens'],
    ],
    sections: [
      {
        title: 'What it is',
        paras: [
          'CashToken Rewards turns everyday spending into entries in a weekly prize draw. Shopping with a partner brand earns CashTokens, which are redeemable against draws running from ₦5,000 up to ₦100 million. It runs in Nigeria and the UK from one codebase.',
        ],
        lead: 'Shipped features:',
        bullets: [
          '<strong>Discover</strong> — partner brands filterable by online, retail and travel.',
          '<strong>Rewards</strong> — tokens earned, cashback received, weekly draw countdown and entry history.',
          '<strong>Gifting</strong> — send CashTokens to someone by phone number, email or QR code.',
          '<strong>Bill payments</strong> for airtime, data, electricity and cable TV.',
          '<strong>Wallet</strong> and affiliate programme, plus business mode for resale pricing.',
          '<strong>Multi-market</strong> switching, with currency and partner catalogue resolved per market.',
        ],
      },
      {
        title: 'My role',
        paras: [
          'I worked on this app as one of two developers, alongside a senior engineer, first as a student intern and then as a graduate trainee. I want to be precise about scope: a good part of the architecture predates me, and the environment strategy was a joint decision — I am not claiming either.',
          'What was <strong>mine</strong>: refactoring a legacy area of the codebase for performance and maintainability, building and shipping new feature modules into a live product, and owning release cycles — build flavours, signing and submission to both stores. I also carried the app through a backend migration without breaking the version already installed on users’ phones.',
        ],
      },
      {
        title: 'Architecture',
        paras: [
          'The client sits on a <strong>three-environment service layer</strong>, which is the decision that shaped everything else. The v2 API spans five hosts — VAS, Core, IDP, Payment and Notification — and was still being built while we shipped against it. Blocking on it would have stalled all client work.',
          'So <code>dev</code> runs entirely against a local SQLite database that seeds itself with demo data on first launch, while <code>staging</code> and <code>prod</code> integrate the real topology. The app stays fully buildable, runnable and demoable with no network at all.',
          '<strong>Market configuration</strong> resolves behind that same service layer. Nigeria and the UK differ in currency, partner brands, available services and regulatory copy, and handling that with conditionals sprinkled through the widget tree would not have survived a third market — so screens stay market-agnostic and the service layer answers the question.',
          '<strong>Secrets stay out of version control.</strong> Signing keys, keystores and API keys come in through <code>--dart-define-from-file</code> and are read at compile time, with per-flavour files for staging and production. Nothing sensitive is parsed at runtime and nothing sensitive is committed.',
        ],
      },
      {
        title: 'State management',
        paras: [
          'This codebase predates me and uses <code>Provider</code> with <code>ChangeNotifier</code>, so my work sat inside an existing choice rather than making a new one. That is its own useful exercise: the discipline is to match the surrounding conventions rather than introduce a second state library into an app that already ships.',
          'Where I had room, the refactoring work concentrated on narrowing what each notifier rebuilt — selective listening instead of whole-screen rebuilds — which is where most of the performance was recovered.',
        ],
      },
      {
        title: 'Stack',
        stack: [
          ['Flutter · Dart', 'One codebase across Android and iOS, two live markets'],
          ['Provider', 'Existing state layer; matched rather than replaced'],
          ['SQLite', 'Seeded local database powering the fully offline dev environment'],
          ['REST', 'Five-host v2 API across VAS, Core, IDP, Payment and Notification'],
          ['dart-define-from-file', 'Compile-time secrets and per-flavour configuration'],
          ['Build flavours', 'dev, staging and production with separate signing'],
        ],
      },
      {
        title: 'Reflection',
        paras: [
          'The offline dev environment is the idea I have reused most since. Decoupling client progress from backend readiness is worth its setup cost several times over, and I now build something equivalent into every project.',
          'Release engineering also turned out to be a skill rather than an afterthought — flavours, signing, store metadata and review turnaround are the difference between shipping weekly and shipping quarterly.',
          'Mostly, though, working next to a senior engineer on a live product taught me the difference between code that works and code someone else can safely change in a year. That is the standard I hold my own projects to now, which is exactly why Learners Forge has fourteen specifications behind it.',
        ],
      },
    ],
  },
]

export const bySlug = (slug) => projects.find((p) => p.slug === slug)
export const nextOf = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
