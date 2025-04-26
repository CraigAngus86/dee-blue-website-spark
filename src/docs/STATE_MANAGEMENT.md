
# State Management Documentation

## Overview

The Banks o' Dee FC website uses a combination of local component state and React hooks for state management. This document outlines the patterns and practices used throughout the application.

## State Management Patterns

### Local Component State

For component-specific state that doesn't need to be shared, we use React's `useState` hook:

```tsx
const [isOpen, setIsOpen] = useState(false);
```

### Custom Hooks

For reusable stateful logic, we use custom hooks that encapsulate related state and behaviors:

```tsx
// Example: useMatchData hook
const { matches, isLoading, error } = useMatchData('fixtures');
```

### Context API

For state that needs to be shared across multiple components without prop drilling, we use React's Context API:

```tsx
// Example: SidebarContext
const { isSidebarOpen, toggleSidebar } = useSidebar();
```

## Data Fetching State

For managing API data and loading states, we use TanStack Query (React Query):

```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ['fixtures'],
  queryFn: fetchFixtures
});
```

## Form State

For form state management, we use React Hook Form:

```tsx
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(contactFormSchema)
});
```

## UI State

UI state is typically managed at the component level using `useState`:

- Modal open/closed state
- Active tab selection
- Accordion expand/collapse state
- Pagination state

## State Persistence

For state that needs to persist across page reloads:

- Session data is stored with Supabase Auth
- User preferences use localStorage via custom hooks

## Best Practices

1. **Keep state as local as possible** - Only elevate state when necessary
2. **Use reducers for complex state** - When state has multiple sub-values or complex update logic
3. **Memoize expensive calculations** - Use `useMemo` to prevent unnecessary recalculations
4. **Prevent unnecessary renders** - Use `useCallback` for functions passed as props
5. **Separate UI state from data state** - UI state should be managed separately from API data

## Example State Management Scenarios

### Navigation State

The current navigation state is managed through the SidebarProvider:

```tsx
function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSidebar = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}
```

### Data Loading States

Loading states for data are handled with React Query's built-in states:

```tsx
// Example: News listing component
const { data, isLoading, error } = useQuery({
  queryKey: ['news'],
  queryFn: fetchNews
});

if (isLoading) return <LoadingState />;
if (error) return <ErrorMessage error={error} />;

return <NewsGrid articles={data.articles} />;
```

### Form Submission State

Form submission states are managed using local state:

```tsx
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitError, setSubmitError] = useState(null);
const [isSuccess, setIsSuccess] = useState(false);

const handleSubmit = async (data) => {
  setIsSubmitting(true);
  setSubmitError(null);
  
  try {
    await submitContactForm(data);
    setIsSuccess(true);
  } catch (error) {
    setSubmitError(error.message);
  } finally {
    setIsSubmitting(false);
  }
};
```

## State Management Evolution

As the application grows, we continuously evaluate our state management needs:

1. For small to medium applications, the current approach is sufficient
2. For larger applications, we may consider more structured state management solutions
3. Future Next.js migration will incorporate server components, reducing client-side state needs
