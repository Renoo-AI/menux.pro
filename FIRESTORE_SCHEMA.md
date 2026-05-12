# Firestore Schema

```typescript
// Core Entities

restaurants/{restaurantId}
  - slug: string
  - name: string
  - plan: string
  - status: "active" | "paused" | "trial"
  - branding: { primaryColor, accentColor }

  menuItems/{menuItemId}
    - name: { fr, en, ar }
    - price: number
    - categoryId: string
    - available: boolean
    - sortOrder: number

  tables/{tableId}
    - label: string
    - qrCodeValue: string
    - status: string
    - enabled: boolean

  orders/{orderId}
    - tableId: string
    - tableLabel: string
    - status: "created" | "accepted" | "awaiting_payment" | "paid" | "closed" | "cancelled"
    - items: Array<{ menuItemId, quantity, unitPrice }>
    - total: number
    - createdAt: Timestamp

  logs/{logId}
    - actorRole: string
    - action: string
    - metadata: object
    - createdAt: Timestamp

users/{uid}
  - email: string
  - role: "owner" | "superadmin" | "manager"
  - restaurantId?: string
```

## Critical Rules
- Operations like `orders` and `logs` must be strictly namespaced under their parent `restaurants/{restaurantId}` tenant collection to prevent cross-tenant data leaks.
- All writes explicitly use `serverTimestamp()` to avoid client clock tampering.
