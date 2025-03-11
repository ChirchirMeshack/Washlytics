/**
 * @file types/supabase.ts
 * @description Type definitions for Sparkle car wash management system database schema
 * @version 1.0.0
 */

/**
 * JSON value type for metadata and settings
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

/**
 * ISO date string type for better timestamp handling
 */
export type ISODateString = string

/**
 * Status enums for better type safety and reusability
 */
export enum AppointmentStatus {
  Scheduled = "scheduled",
  Completed = "completed",
  Cancelled = "cancelled",
  NoShow = "no-show",
}

export enum PaymentMethod {
  Cash = "cash",
  Card = "card",
  MobileMoney = "mobile_money",
  BankTransfer = "bank_transfer",
}

export enum PaymentStatus {
  Paid = "paid",
  Pending = "pending",
  Failed = "failed",
}

export enum UserRole {
  Admin = "admin",
  Manager = "manager",
  Employee = "employee",
}

export enum CampaignType {
  SMS = "sms",
  Email = "email",
  SocialMedia = "social_media",
  Other = "other",
}

export enum CampaignStatus {
  Draft = "draft",
  Scheduled = "scheduled",
  Sent = "sent",
  Cancelled = "cancelled",
}

/**
 * Database schema type definition
 */
export interface Database {
  public: {
    Tables: {
      /**
       * Tenants Table
       * Main business entity information
       */
      tenants: {
        Row: TenantRow
        Insert: TenantInsert
        Update: TenantUpdate
      }

      /**
       * Profiles Table
       * Extended user information and roles
       */
      profiles: {
        Row: ProfileRow
        Insert: ProfileInsert
        Update: ProfileUpdate
      }

      /**
       * Services Table
       * Available car wash services
       */
      services: {
        Row: ServiceRow
        Insert: ServiceInsert
        Update: ServiceUpdate
      }

      /**
       * Clients Table
       * Customer information including vehicle details
       */
      clients: {
        Row: ClientRow
        Insert: ClientInsert
        Update: ClientUpdate
      }

      /**
       * Appointments Table
       * Service scheduling and tracking
       */
      appointments: {
        Row: AppointmentRow
        Insert: AppointmentInsert
        Update: AppointmentUpdate
      }

      /**
       * Branches Table
       * Business location information
       */
      branches: {
        Row: BranchRow
        Insert: BranchInsert
        Update: BranchUpdate
      }

      /**
       * Inventory Table
       * Stock management
       */
      inventory: {
        Row: InventoryRow
        Insert: InventoryInsert
        Update: InventoryUpdate
      }

      /**
       * Sales Table
       * Transaction records
       */
      sales: {
        Row: SaleRow
        Insert: SaleInsert
        Update: SaleUpdate
      }

      /**
       * Expenses Table
       * Business expense tracking
       */
      expenses: {
        Row: ExpenseRow
        Insert: ExpenseInsert
        Update: ExpenseUpdate
      }

      /**
       * Marketing Campaigns Table
       * Marketing activity management
       */
      marketing_campaigns: {
        Row: MarketingCampaignRow
        Insert: MarketingCampaignInsert
        Update: MarketingCampaignUpdate
      }

      /**
       * Marketplace Items Table
       * Equipment and supplies marketplace
       */
      marketplace_items: {
        Row: MarketplaceItemRow
        Insert: MarketplaceItemInsert
        Update: MarketplaceItemUpdate
      }

      /**
       * Tenant Settings Table
       * Configurable settings for each tenant
       */
      tenant_settings: {
        Row: TenantSettingRow
        Insert: TenantSettingInsert
        Update: TenantSettingUpdate
      }

      /**
       * Vehicles Table
       * Normalized vehicle data
       */
      vehicles: {
        Row: VehicleRow
        Insert: VehicleInsert
        Update: VehicleUpdate
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_new_user: {
        Args: Record<string, never>
        Returns: unknown
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

/**
 * Base types for each table to reduce duplication
 */

// Tenant types
interface TenantBase {
  name: string
  subdomain: string
  owner_id: string
  logo?: string | null
}

interface TenantRow extends TenantBase {
  id: string
  created_at: ISODateString
  updated_at: ISODateString
  logo: string | null
}

interface TenantInsert extends TenantBase {
  id?: string
  created_at?: ISODateString
  updated_at?: ISODateString
}

type TenantUpdate = Partial<TenantRow>

// Profile types
interface ProfileBase {
  email?: string | null
  phone?: string | null
  role: UserRole
  tenant_id: string
  first_name?: string | null
  last_name?: string | null
  avatar_url?: string | null
}

interface ProfileRow extends ProfileBase {
  id: string
  email: string | null
  phone: string | null
  first_name: string | null
  last_name: string | null
  avatar_url: string | null
  created_at: ISODateString
  updated_at: ISODateString
}

interface ProfileInsert extends ProfileBase {
  id: string
  created_at?: ISODateString
  updated_at?: ISODateString
}

type ProfileUpdate = Partial<ProfileRow>

// Service types
interface ServiceBase {
  tenant_id: string
  name: string
  description?: string | null
  price: number
  duration: number
  active?: boolean
}

interface ServiceRow extends ServiceBase {
  id: string
  description: string | null
  active: boolean
  created_at: ISODateString
  updated_at: ISODateString
}

interface ServiceInsert extends ServiceBase {
  id?: string
  created_at?: ISODateString
  updated_at?: ISODateString
}

type ServiceUpdate = Partial<ServiceRow>

// Client types
interface ClientBase {
  tenant_id: string
  first_name: string
  last_name: string
  email?: string | null
  phone?: string | null
  notes?: string | null
}

interface ClientRow extends ClientBase {
  id: string
  email: string | null
  phone: string | null
  notes: string | null
  created_at: ISODateString
  updated_at: ISODateString
}

interface ClientInsert extends ClientBase {
  id?: string
  created_at?: ISODateString
  updated_at?: ISODateString
}

type ClientUpdate = Partial<ClientRow>

// Vehicle types
interface VehicleBase {
  client_id: string
  make: string
  model: string
  year: string
  color: string
  license_plate: string
  is_primary?: boolean
}

interface VehicleRow extends VehicleBase {
  id: string
  is_primary: boolean
  created_at: ISODateString
  updated_at: ISODateString
}

interface VehicleInsert extends VehicleBase {
  id?: string
  created_at?: ISODateString
  updated_at?: ISODateString
}

type VehicleUpdate = Partial<VehicleRow>

// Appointment types
interface AppointmentBase {
  tenant_id: string
  client_id: string
  service_id: string
  vehicle_id: string
  start_time: ISODateString
  end_time: ISODateString
  status: AppointmentStatus
  notes?: string | null
}

interface AppointmentRow extends AppointmentBase {
  id: string
  notes: string | null
  created_at: ISODateString
  updated_at: ISODateString
}

interface AppointmentInsert extends AppointmentBase {
  id?: string
  created_at?: ISODateString
  updated_at?: ISODateString
}

type AppointmentUpdate = Partial<AppointmentRow>

// Branch types
interface BranchBase {
  tenant_id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  phone?: string | null
  email?: string | null
  is_main?: boolean
}

interface BranchRow extends BranchBase {
  id: string
  phone: string | null
  email: string | null
  is_main: boolean
  created_at: ISODateString
  updated_at: ISODateString
}

interface BranchInsert extends BranchBase {
  id?: string
  created_at?: ISODateString
  updated_at?: ISODateString
}

type BranchUpdate = Partial<BranchRow>

// Inventory types
interface InventoryBase {
  tenant_id: string
  name: string
  description?: string | null
  quantity: number
  unit_price: number
  category?: string | null
  min_stock_level?: number | null
  supplier?: string | null
}

interface InventoryRow extends InventoryBase {
  id: string
  description: string | null
  category: string | null
  min_stock_level: number | null
  supplier: string | null
  created_at: ISODateString
  updated_at: ISODateString
}

interface InventoryInsert extends InventoryBase {
  id?: string
  created_at?: ISODateString
  updated_at?: ISODateString
}

type InventoryUpdate = Partial<InventoryRow>

// Sale types
interface SaleBase {
  tenant_id: string
  appointment_id?: string | null
  client_id?: string | null
  total_amount: number
  payment_method: PaymentMethod
  payment_status: PaymentStatus
  notes?: string | null
}

interface SaleRow extends SaleBase {
  id: string
  appointment_id: string | null
  client_id: string | null
  notes: string | null
  created_at: ISODateString
  updated_at: ISODateString
}

interface SaleInsert extends SaleBase {
  id?: string
  created_at?: ISODateString
  updated_at?: ISODateString
}

type SaleUpdate = Partial<SaleRow>

// Expense types
interface ExpenseBase {
  tenant_id: string
  category: string
  amount: number
  description?: string | null
  receipt_url?: string | null
  expense_date: ISODateString
}

interface ExpenseRow extends ExpenseBase {
  id: string
  description: string | null
  receipt_url: string | null
  created_at: ISODateString
  updated_at: ISODateString
}

interface ExpenseInsert extends ExpenseBase {
  id?: string
  created_at?: ISODateString
  updated_at?: ISODateString
}

type ExpenseUpdate = Partial<ExpenseRow>

// Marketing Campaign types
interface MarketingCampaignBase {
  tenant_id: string
  name: string
  type: CampaignType
  content: string
  status: CampaignStatus
  scheduled_date?: ISODateString | null
  sent_date?: ISODateString | null
  recipient_count?: number | null
}

interface MarketingCampaignRow extends MarketingCampaignBase {
  id: string
  scheduled_date: ISODateString | null
  sent_date: ISODateString | null
  recipient_count: number | null
  created_at: ISODateString
  updated_at: ISODateString
}

interface MarketingCampaignInsert extends MarketingCampaignBase {
  id?: string
  created_at?: ISODateString
  updated_at?: ISODateString
}

type MarketingCampaignUpdate = Partial<MarketingCampaignRow>

// Marketplace Item types
interface MarketplaceItemBase {
  name: string
  description: string
  price: number
  image_url?: string | null
  category: string
  seller_id: string
  stock?: number
  is_published?: boolean
}

interface MarketplaceItemRow extends MarketplaceItemBase {
  id: string
  image_url: string | null
  stock: number
  is_published: boolean
  created_at: ISODateString
  updated_at: ISODateString
}

interface MarketplaceItemInsert extends MarketplaceItemBase {
  id?: string
  created_at?: ISODateString
  updated_at?: ISODateString
}

type MarketplaceItemUpdate = Partial<MarketplaceItemRow>

// Tenant Setting types
interface TenantSettingBase {
  tenant_id: string
  key: string
  value: Json
}

interface TenantSettingRow extends TenantSettingBase {
  id: string
  created_at: ISODateString
  updated_at: ISODateString
}

interface TenantSettingInsert extends TenantSettingBase {
  id?: string
  created_at?: ISODateString
  updated_at?: ISODateString
}

type TenantSettingUpdate = Partial<TenantSettingRow>

/**
 * Type for foreign key relationships
 * Helps with type safety when joining tables
 */
export interface ForeignKeyRelations {
  "appointments.client_id": Database["public"]["Tables"]["clients"]["Row"]
  "appointments.service_id": Database["public"]["Tables"]["services"]["Row"]
  "appointments.vehicle_id": Database["public"]["Tables"]["vehicles"]["Row"]
  "profiles.tenant_id": Database["public"]["Tables"]["tenants"]["Row"]
  "services.tenant_id": Database["public"]["Tables"]["tenants"]["Row"]
  "clients.tenant_id": Database["public"]["Tables"]["tenants"]["Row"]
  "vehicles.client_id": Database["public"]["Tables"]["clients"]["Row"]
  "branches.tenant_id": Database["public"]["Tables"]["tenants"]["Row"]
  "inventory.tenant_id": Database["public"]["Tables"]["tenants"]["Row"]
  "sales.tenant_id": Database["public"]["Tables"]["tenants"]["Row"]
  "sales.appointment_id": Database["public"]["Tables"]["appointments"]["Row"]
  "sales.client_id": Database["public"]["Tables"]["clients"]["Row"]
  "expenses.tenant_id": Database["public"]["Tables"]["tenants"]["Row"]
  "marketing_campaigns.tenant_id": Database["public"]["Tables"]["tenants"]["Row"]
  "marketplace_items.seller_id": Database["public"]["Tables"]["tenants"]["Row"]
  "tenant_settings.tenant_id": Database["public"]["Tables"]["tenants"]["Row"]
}

