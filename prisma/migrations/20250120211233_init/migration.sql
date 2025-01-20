-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "scope" TEXT,
    "expires" TIMESTAMP,
    "accessToken" TEXT NOT NULL,
    "userId" BIGINT,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "accountOwner" BOOLEAN DEFAULT false,
    "locale" TEXT,
    "collaborator" BOOLEAN DEFAULT false,
    "emailVerified" BOOLEAN DEFAULT false,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnlineAccessInfo" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT,
    "expiresIn" INTEGER NOT NULL,
    "associatedUserScope" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OnlineAccessInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssociatedUser" (
    "id" TEXT NOT NULL,
    "onlineAccessInfoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" BIGINT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "accountOwner" BOOLEAN NOT NULL,
    "locale" TEXT NOT NULL,
    "collaborator" BOOLEAN NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,

    CONSTRAINT "AssociatedUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Config" (
    "id" TEXT NOT NULL,
    "token" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessedOrders" (
    "id" TEXT NOT NULL,
    "orderId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProcessedOrders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OnlineAccessInfo_sessionId_key" ON "OnlineAccessInfo"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "AssociatedUser_onlineAccessInfoId_key" ON "AssociatedUser"("onlineAccessInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "ProcessedOrders_orderId_key" ON "ProcessedOrders"("orderId");

-- AddForeignKey
ALTER TABLE "OnlineAccessInfo" ADD CONSTRAINT "OnlineAccessInfo_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssociatedUser" ADD CONSTRAINT "AssociatedUser_onlineAccessInfoId_fkey" FOREIGN KEY ("onlineAccessInfoId") REFERENCES "OnlineAccessInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
