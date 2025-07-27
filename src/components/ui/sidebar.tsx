"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof sidebarVariants>
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    data-variant={variant}
    className={cn(sidebarVariants({ variant }), className)}
    {...props}
  />
))
Sidebar.displayName = "Sidebar"

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
    collapsible?: boolean
  }
>(({ className, children, defaultOpen = true, open, onOpenChange, collapsible = false, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  const isControlled = open !== undefined
  const openState = isControlled ? open : isOpen
  const setOpenState = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const newOpenState = typeof value === "function" ? value(openState) : value
      if (onOpenChange) {
        onOpenChange(newOpenState)
      } else {
        setIsOpen(newOpenState)
      }
    },
    [onOpenChange, openState]
  )

  React.useEffect(() => {
    if (isControlled) {
      setIsOpen(open)
    }
  }, [isControlled, open])

  return (
    <SidebarContext.Provider
      value={{
        isOpen: openState,
        setIsOpen: setOpenState,
        collapsible,
      }}
    >
      <div
        ref={ref}
        data-state={openState ? "open" : "closed"}
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
})
SidebarProvider.displayName = "SidebarProvider"

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { isOpen, setIsOpen } = useSidebar()

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("h-6 w-6", className)}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-[60px] items-center px-2", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { isOpen } = useSidebar()

  return (
    <div
      ref={ref}
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "flex flex-col gap-4 py-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-[60px] items-center px-2", className)}
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-4", className)}
    {...props}
  />
))
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-2 text-xs font-semibold", className)}
    {...props}
  />
))
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
  }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "button"
  return (
    <Comp
      ref={ref}
      className={cn(
        "group relative flex w-full items-center justify-start rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground [&[data-state=open]>svg]:rotate-90",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="ghost"
    size="icon"
    className={cn("h-8 w-8", className)}
    {...props}
  />
))
SidebarMenuAction.displayName = "SidebarMenuAction"

const SidebarMenuSub = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1", className)}
    {...props}
  />
))
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
  }
>(({ className, asChild = false, children, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "button"
  return (
    <Comp
      ref={ref}
      className={cn(
        "group relative flex w-full items-center justify-start rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground [&[data-state=open]>svg]:rotate-90",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200" />
    </Comp>
  )
})
SidebarMenuSubTrigger.displayName = "SidebarMenuSubTrigger"

const SidebarMenuSubContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1", className)}
    {...props}
  />
))
SidebarMenuSubContent.displayName = "SidebarMenuSubContent"

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("ml-auto rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground", className)}
    {...props}
  />
))
SidebarMenuBadge.displayName = "SidebarMenuBadge"

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    showIcon?: boolean
  }
>(({ className, showIcon = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2 px-3 py-2", className)}
    {...props}
  >
    {showIcon && <div className="h-4 w-4 animate-pulse rounded bg-muted" />}
    <div className="h-4 flex-1 animate-pulse rounded bg-muted" />
  </div>
))
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

const SidebarSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    className={cn("my-2", className)}
    {...props}
  />
))
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarRail = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
))
SidebarRail.displayName = "SidebarRail"

const SidebarContext = React.createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  collapsible: boolean
}>({
  isOpen: true,
  setIsOpen: () => {},
  collapsible: false,
})

const useSidebar = () => {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

const sidebarVariants = cva(
  "group relative flex h-full w-full flex-col gap-4 bg-background p-4 transition-all duration-300 ease-in-out data-[state=closed]:w-[60px] data-[state=closed]:p-2 ",
  {
    variants: {
      variant: {
        default: "border-border",
        ghost: "border-transparent",
      },
    },
    defaultVariants: {
      variant: "ghost",
    },
  }
)

export {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubTrigger,
  SidebarMenuSubContent,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarSeparator,
  SidebarRail,
  useSidebar,
} 