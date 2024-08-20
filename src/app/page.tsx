"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Hebb Script</h1>
      <Image src="/next.svg" alt="Hebb Script" width={400} height={400} />
      <p className="text-center">
        Um simples programa que usa aprendizado Hebbiano para treinar um rede
        neural para identidicar letras do alfabeto.
      </p>
      <Link href="/hebb">
        <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Regra de Hebb
        </span>
      </Link>
      <Link href="/perceptron">
        <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Perceptron
        </span>
      </Link>
    </main>
  );
}
