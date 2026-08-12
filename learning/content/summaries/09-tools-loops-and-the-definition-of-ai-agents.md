# Tools, Loops, and the Definition of AI Agents

> Quick summary | Week 1 | Day 2

## At a glance

And then trick number three is called tools. And of course this is a really exciting one and it really took off in a massive way last year and a bit the year before as well.

Tools is about realizing that when we have LLM's generate tokens, the most likely output, we could use those tokens not just to generate just a text response but also to decide whether or not the LLM would like to carry out some actions that it's been told it could do. So in the prompt in the input that you send the LLM you can say hey I'd like you to answer my question but by the way you can also respond with some special tokens to say I would like to search the internet," or "I would like to use a calculator," or "I would like to run some Python code," and then tell me what.

And if you respond with that, then I will do that action for you, and then I will call you a second time with the results. And that little clever trick, which is called "using tools," it allows us to use the LLM, not just to generate a text output, but actually to decide to do something.

## Key takeaways

- We call it running a tool and then we will run the tool and provide it back with the response. But you always have to stay grounded in the reality that the LLM itself isn't goin...
- But we are interpreting those tokens. It's generating tokens that said something like, I would like to run a calculator. And we're interpreting that output, and we're running th...
- So it's always our code, it's always software that ends up calling a tool. We're using the LLM just to generate the tokens to say what it wants to do next. And that whole proces...
- All right, I just want to make this super real for you just just to be very clear. Here is something hopefully familiar to you. This is Jout GPT and I'm going to paste in a ques...
- Okay, before the question, I want to I want to prefix it to use Python code to respond to the next question. Just reply, Python colon, and then a Python expression here. And the...

## You will learn

- Core ideas from **Tools, Loops, and the Definition of AI Agents**
- Practical steps shown in Week 1, Day 2
- How to apply the workflow in your own projects

## Bottom line

And you could see it happening. And so that gave you like a first-hand experience of an AI agent. It was running tools in a loop, and we gave it a goal, and it achieved it. So that is the current winning definition of an AI agent.
