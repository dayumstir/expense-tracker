"use client";

import { Button } from "~/components/ui/button";
import { CheckIcon } from "@heroicons/react/24/solid";

type Props = {
  handleKeypadPress: (num: string) => void;
};

export function NumberPad(props: Props) {
  const handleClick = props.handleKeypadPress;

  return (
    <div className="grid w-full max-w-sm grid-cols-3 gap-4 p-4">
      <Button
        className="bg-slate-800 py-8 text-2xl text-slate-300"
        onClick={() => handleClick("1")}
      >
        1
      </Button>
      <Button
        className="bg-slate-800 py-8 text-2xl text-slate-300"
        onClick={() => handleClick("2")}
      >
        2
      </Button>
      <Button
        className="bg-slate-800 py-8 text-2xl text-slate-300"
        onClick={() => handleClick("3")}
      >
        3
      </Button>
      <Button
        className="bg-slate-800 py-8 text-2xl text-slate-300"
        onClick={() => handleClick("4")}
      >
        4
      </Button>
      <Button
        className="bg-slate-800 py-8 text-2xl text-slate-300"
        onClick={() => handleClick("5")}
      >
        5
      </Button>
      <Button
        className="bg-slate-800 py-8 text-2xl text-slate-300"
        onClick={() => handleClick("6")}
      >
        6
      </Button>
      <Button
        className="bg-slate-800 py-8 text-2xl text-slate-300"
        onClick={() => handleClick("7")}
      >
        7
      </Button>
      <Button
        className="bg-slate-800 py-8 text-2xl text-slate-300"
        onClick={() => handleClick("8")}
      >
        8
      </Button>
      <Button
        className="bg-slate-800 py-8 text-2xl text-slate-300"
        onClick={() => handleClick("9")}
      >
        9
      </Button>
      <Button
        className="bg-slate-800 py-8 text-2xl text-slate-300"
        onClick={() => handleClick(".")}
      >
        .
      </Button>
      <Button
        className="bg-slate-800 py-8 text-2xl text-slate-300"
        onClick={() => handleClick("0")}
      >
        0
      </Button>
      <Button className="bg-primary py-8 text-2xl text-slate-300">
        <CheckIcon className="h-8" />
      </Button>
    </div>
  );
}
