export default function FilterFieldSet({ children }: { children: React.ReactNode }) {
  return (
    <fieldset className="grid gap-2">
      {children}
    </fieldset>
  )
}