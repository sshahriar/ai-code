var e=`# Tools, Loops, and the Definition of AI Agents

> Week 1 · Day 2

## Overview

And then trick number three is called tools. And of course this is a really exciting one and it really took off in a massive way last year and a bit the year before as well.

Tools is about realizing that when we have LLM's generate tokens, the most likely output, we could use those tokens not just to generate just a text response but also to decide whether or not the LLM would like to carry out some actions that it's been told it could do. So in the prompt in the input that you send the LLM you can say hey I'd like you to answer my question but by the way you can also respond with some special tokens to say I would like to search the internet," or "I would like to use a calculator," or "I would like to run some Python code," and then tell me what.

And if you respond with that, then I will do that action for you, and then I will call you a second time with the results. And that little clever trick, which is called "using tools," it allows us to use the LLM, not just to generate a text output, but actually to decide to do something.

## You will learn

- Understand the main ideas covered in **Tools, Loops, and the Definition of AI Agents**
- Follow the practical walkthrough from Week 1, Day 2
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

We call it running a tool and then we will run the tool and provide it back with the response. But you always have to stay grounded in the reality that the LLM itself isn't going off and searching the Internet or running Python code. And LLM is just a statistical engine that generates tokens.

But we are interpreting those tokens. It's generating tokens that said something like, I would like to run a calculator. And we're interpreting that output, and we're running the calculator.

So it's always our code, it's always software that ends up calling a tool. We're using the LLM just to generate the tokens to say what it wants to do next. And that whole process is called calling tools and it's really clever.

All right, I just want to make this super real for you just just to be very clear. Here is something hopefully familiar to you. This is Jout GPT and I'm going to paste in a question I have for it.

Okay, before the question, I want to I want to prefix it to use Python code to respond to the next question. Just reply, Python colon, and then a Python expression here. And then my question, what is the square root of pi, a question which perhaps isn't going to be very easy for a language model to respond to, but I'm telling it that it can do something special.

It can reply this way if it wants to just execute Python code. So I'm going to run that and we'll see how it responds. And this is how it responds.

And you can see that it's done something, it's done something reasonably advanced because it's doing all in one line, including imports, which I assume will work. But it's actually decided instead of responding with a square root of pi, it's responding with this Python line of code right here, quite a clever Python line of code. And so you can see that basically it's using a tool.

We've equipped chat GBT with this tool that we've just used language for. And when we've asked it this question, it hasn't given us the answer, it hasn't just told us the square root of pi. But rather, it's said that it wants to execute some Python code.

And this is like a super clear example of what it means to have an LLM use a tool. It's just about giving it a clever input and then interpreting the output. That is what tool calling is all about.

### Deep dive

And the fourth trick is something that's so simple, it's super elegant. It's basically saying what could be better than calling an LLM with an input and getting some output? Or what could be better is calling it multiple times.

In fact, in a loop, we can call an LLM and then when it's produced its output, we can ask if it's finished yet and if not, we just call it again. And then again, and then again, in just call it again and then again and then again in just a loop repeating until a goal is met. And that simple idea of calling an LLM multiple times is something which turns out to allow us to achieve much bigger goals than just calling an LLM once with an input and getting an output.

And so that fourth trick of the loop is something which allowed us to achieve much bigger things. So those are four tricks. There are lots of other tricks, but these are the big four tricks that allow us to get from the sort of beginnings, from the chat GPT of 2022, to some of the high performance products today, like cursor agent and cloud code.

Okay. Now it's time for me to define an AI agent for you. So there's been a lot of different definitions of AI agents.

And in fact, there was a meme a while back that an AI agent could be whatever you wanted it to be because it was so hyped and because everyone meant something a bit different. There've been a few different definitions that people have really stood behind over the years. And one of the earliest ones came from OpenAI and others that described it as AI systems that can do work for you independently.

This is the idea behind products like GPT agent that used to be called Operator. And this was something where you can prompt it and it will open up a browser and you can watch it while it goes off and searches the web. It looks for restaurants that have availability this evening, for the particular type of food you like with reservations for four and it will make the reservation while you watch.

And you have that sense that there is something there that's working autonomously. And that is the sense of having an AI agent that is doing work. Some other people use a similar definition and that it's something that can act as well as generating tokens.

It is an LLM that can act. Which, you know, it's hard to be super crisp about what that means, but you kind of know it when you see it. And that was the first of the definitions of an AI agent.

And then the next one came in, I guess, early 2025. And I think it was hugging face, first of all, that the New Yorker AI starts up. The described it as AI systems where an LLM controls the workflow.

### Putting it together

And LLM controls the workflow. So an LLM as it's generating output tokens, those tokens describe what should happen next, and orchestrate future LLM calls. That became the definition, and anthropic and a double-down on that with a seminal blog post called Building Effective Agents that had a similar definition, and that for a long time was like the prevailing definition of an AI agent.

But more recently, the definition that's really taken hold that's become the definition that I think Simon Willison, who I mentioned before, was perhaps the first to really sort of plant the flag and say, "This is going to be the definition." It came in late 2025, and it is that an agent is where there is an allalam that runs tools in a loop to achieve a goal. It runs tools in a loop to achieve a goal. So it ties back to a couple of those tricks that I just mentioned.

Tools and loop. I've heard something. Again, it runs tools in a loop to achieve a goal.

And I'm hoping that already clicks for you, but if not, remember what we did yesterday with the Cursor Agent. When we gave it a goal, we said, "I want a first-person shooter in a web page." And off it went. We'd gave it a goal, we said, "I want a first person shooter in a web page." And off it went.

We've given it a goal. It was obviously in a loop because we saw stuff happening one after another. We saw files being created.

It was an LLM being repeatedly called again and again. And it had tools. It had tools to write files to disk.

It had tools to run code. It had tools to generate code. So it had these various tools, and it was using those tools.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

We call it running a tool and then we will run the tool and provide it back with the response. But you always have to stay grounded in the reality that the LLM itself isn't going off and searching the Internet or running Python code. And LLM is just a statistical engine that generates tokens.

## Practical tips

- We call it running a tool and then we will run the tool and provide it back with the response. But you always have to stay grounded in the reality that the LLM itself isn't going off and searching the Internet or running Python code. And LLM is just a statistical engine that generates tokens.
- So it's always our code, it's always software that ends up calling a tool. We're using the LLM just to generate the tokens to say what it wants to do next. And that whole process is called calling tools and it's really clever.
- And I'm hoping that already clicks for you, but if not, remember what we did yesterday with the Cursor Agent. When we gave it a goal, we said, "I want a first-person shooter in a web page." And off it went. We'd gave it a goal, we said, "I want a first person shooter in a web page." And off it went.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

And you could see it happening. And so that gave you like a first-hand experience of an AI agent. It was running tools in a loop, and we gave it a goal, and it achieved it. So that is the current winning definition of an AI agent.
`;export{e as default};