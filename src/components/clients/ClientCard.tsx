// components/clients/ClientCard.tsx
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin } from "lucide-react";
import type { Client } from "@/types/client";

export function ClientCard({ client }: { client: Client }) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-2 border-orange-100 hover:border-orange-300">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Logo Container with orange gradient background */}
          <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-3 flex items-center justify-center">
            {client.image ? (
              <Image
                src={client.image}
                alt={client.name}
                width={80}
                height={80}
                className="object-contain w-full h-full"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = `/api/placeholder/80/80`;
                }}
              />
            ) : (
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-orange-600" />
              </div>
            )}
          </div>

          {/* Client Info */}
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-sm md:text-base line-clamp-2 text-gray-800 group-hover:text-orange-700 transition-colors">
              {client.name}
            </h3>
            {client.location && (
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3 text-orange-500" />
                <span className="line-clamp-1">{client.location}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}