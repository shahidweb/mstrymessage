"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import messages from "@/messages.json";

export default function Home() {
  return (
    <>
      <main className="flex-grow fkex flex-col items-center justify-center px-4 md:px-24 py-12">
        <section className="text-center mb-8 md:md-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            {" "}
            Dive into the World of Anonymous Coversations
          </h1>
          <p className="mt-3 md:mt-4 text-base md:test-lg">
            Explore Mystery Message - Where your identity remains a secret.
          </p>
        </section>
        <section className="text-center">
          <Carousel className="w-full max-w-xs m-auto">
            <CarouselContent>
              {messages.map((msg, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardHeader>{msg.title}</CardHeader>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-lg font-semibold">
                          {msg.content}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
        <footer className="text-center mt-8">
          <span>
            @ {new Date().getFullYear()} Mystery Message. All rights
            reserved.{" "}
          </span>
        </footer>
      </main>
    </>
  );
}
