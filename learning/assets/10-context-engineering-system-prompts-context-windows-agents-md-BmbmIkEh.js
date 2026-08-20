var e=`# Context Engineering System Prompts, Context Windows & agents.md

> Week 1 · Day 2

## Overview

So context engineering, possibly the single most popular expression in our world last year. Context engineering, so look, the output of an LLM, we know it's based entirely on the input.

It's stateless, you give it an input, it produces an output, the most likely tokens to follow that input, and that input is sometimes known as the context,'because it's all the contextual information that we're giving the LLM that it can use to generate the output. Getting that input right, getting the context right, that's all we've got.

That's it. The output is only based on the input.

## You will learn

- Understand the main ideas covered in **Context Engineering System Prompts, Context Windows & agents.md**
- Follow the practical walkthrough from Week 1, Day 2
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

So to say getting this right is everything, it's almost like obvious that of course it's everything. That's all it has. It's got that input.

And so getting it right is what this game is all about. We used to call that prompt engineering. Remember when prompt engineering a couple of years ago was like a job that people could have and it was the idea that you had to figure out the best way to prompt an LLM.

But really that term prompt engineering has evolved into this bigger term context engineering which is recognizing it's not just about the prompt, it's all other things like the kind of tools you give it and other things that surround it to make sure that you're doing the best job you possibly can do to give the LLM all the right information in the context so that the output is most likely to achieve your goal. That whole set of techniques is what's known as context engineering. And there were a lot of different components of what goes into this input context, this input to an LLM.

First of them, the first thing, and one of the first things you learn about when you're calling an LLM directly, is there's a part of the prompt, part of the text input that's known as the system prompt that is the most crucial, the most general information that frames the overall situation. What role is this LLM playing? What's its overall job?

Is it an agent that's responsible for writing code? Is it an agent that is a customer support agent for an airline? Whatever it is, that overall framing, including the tone it should take and the approach it should use, that goes into something called the system prompt, which usually is at the very beginning of the information that is sent to the LLM.

There's then a set of descriptions of the different tools that it has access to, a bit like the way I said that if it put the word Python and then something, it would be saying, I want to run that in Python. And that descriptions of the different tools, that's also part of the context. That's what might go in there next.

And of course, the more tools you want it to have access to, the more space you will fill up with these tools. And some people might say that those tool descriptions are actually part of the system prompt. And that's really a definitional thing.

It doesn't particularly matter if you think of them as being part of the same thing or just two separate chunks. It's more or just about how you label it. But in for this diagram anyway, I'm saying there is the overall framing followed by the tools.

And then there's something that is sometimes called the memory. And this is basically information that you want to persist across potentially multiple different conversations. Some people call this long term memory or medium term memory, but this is typically general Resources that can change over time, but the you'd want to always be able to come back to and Then there is the big part of it Which is basically the the the actual input that you're sending to the LLM But remember because of the this way that we have this this trick that that allows us to give the illusion of a memory.

What we send can't just be the most recent message that we want to send the LLM. It's got to be the entire conversation so far. It's got to be the very first message that we sent and then its reply and then our follow-on message and its reply to that.

So all of the messages that formed this conversation to the LLM. All need to fit next in the context. You'll need to be squeezed in next.

And that also needs to include any reasoning that the LLM has done, any of these tokens that it generates to describe its thought process. There are sometimes when you can actually not include that, but generally speaking, that does tend to get included here. And it's replies, and then if it's generated code, then that code that it's generated needs to go here.

If it's called tools, then the tools that it's decided to call and the output from calling those tools, that all has to go in here. All this information forms the input and when it's generating the output, it will be generating output that's consistent with this entire conversation history history of the full conversation so far. So all of that makes up the single input to the LLM because it's stateless and needs to get this entire package that you see here in order to be able to generate the most likely next token that will be consistent with our objective.

### Deep dive

And there's something else. In the coding agents that we're going to be working with. There is a special thing that gets included in there too, which is really, I guess, part of memory.

But I'm going to show it as a separate line item, if you will, a separate thing that gets shoved in here. And it is a special file. And it's often called agents.md.

And you may well know about this already, but we'll be looking at it. And we'll be talking a lot about what makes a good one and a bad one and so on. And you can think of this as being like part of the memory.

It's a resource that persists. Or you can say this is something extra in addition to the other parts of memory. This agents.md is something special.

And of course, if you're working with Cloud Code, it's in fact, claud.md. And with anti-gravity, it's germany.md. But these are all what we generally think of as the agents.md files.

And these are files that we particularly use with coding agents that describe special things about the project we're working on, particular coding standards or things about our objective, something that we want to be in the memory of the AI agent while it's writing code for us. That is agents.md, a special file we write that gets shoved in the context every single time. Ah, I can hear you correcting me there.

You know that it's not every single time. It's more complicated than that. But never fear, we will get to that.

We will get to that. But for now, consider it to be every single time. All right, so that is the context.

That's what context engineering is all about. And as you probably also know, but there's no harm in us going through it again, there is, of course, this idea of a context window, which is to say that an LLM has a limit to how many tokens can be fit in this context before it runs out of room. Because an LLM is designed to be able to look back a number of different tokens as it's forming its predicted next tokens and each LLM can only look back so far that they are only large enough to look back a certain amount of tokens.

And if you try and pass in more tokens than its maximum context window, it will fail. That is considered a break. It can't handle it and it will be an error.

It's the maximum number of tokens that it can examine in its input in order to predict the next tokens. That's called, that's sometimes just called the context window or the context window limit, but it is the maximum size of this context that's passed in. And so it needs to fit within this context window.

And that's something which many of us agonize over constantly. And people obsess over this context limit, the fact that you can't go over it. But in fact, it's worth keeping in mind that in a lot of cases, just having too much in the context, even if you're not yet at the limit, it can still cause performance to degrade.

And I'm using performance there, not in the kind of speed sense, not performance like we software people sometimes say, I'm talking about the accuracy, the quality of the results, that kind of performance. That can start to degrade, you get poorer results, you start to lose coherence, it starts to forget things as you fill up the context more and more. So even if you're not yet at the limit, even if you haven't filled up the context window, you might start to see degrading performance if you're shoving too much in the context.

### Putting it together

And conversely, you tend to get the best performance at the very start of your conversation when the context is super empty and it's only got a little bit to pay attention to. And so that's something to be very cognizant of. It's not just a binary, have you got too much, it fails.

There's also a sense of less is more when it comes to filling up the context. Okay, now I've been saying that the LLM fails when the context window gets filled up and you're probably thinking, well, I don't think it fails. I think it does compacting.

You've probably experienced compacting before. That's actually a feature built in to things like Cloud Code, which is that rather than allowing it to fail, it detects when the context window is almost filled up and it runs this process that essentially looks back at the whole conversation history and then summarizes it and replaces everything with a little summary of what was there before, freeing up lots of space in the context history, in the conversation history. And this is something which which is very common and it's also something which is feared by people like you and me a lot because it changes the game suddenly.

The challenge with compacting is that we are trusting the all-alam to do a good job of figuring out what's important and what's not important from the conversation history and often it does a good job but sometimes it doesn't sometimes it misses an important thing but sometimes it doesn't. Sometimes it misses an important thing that we care a lot about, that we told it about during the conversation, that gets removed when it's summarizing. And as a result, the LLM appears to forget something that we've told it, or it makes the same mistake twice, which is super frustrating.

And because of this, people have tended to fear the compactor, don't like it when it compacts. And often, you'll find the people that I do this a lot myself. Rather than let it compact, I will look at what's happened before, I will stop the agent.

And then I will rewrite my file like agents.md that I mentioned before and then started up again fresh, making sure that I've kept careful note of everything that's happened that it needs to know about. So people do tend to fear the compacting process and like to stop it and refresh it and rewrite it because there's a lack of trust for how compacting works. There's a particular fear as well for if it's going to run compacting whilst it's in the middle of doing something.

And that's something that you can get around by forcing it to compact at a good time. And that's a bit different. But I'm talking about is just a general fear of compacting.

But the truth of the matter is, compacting has got a lot better in a just recent history. And now as of 2026, there is less reason to fear the compactor. It does a really good job.

So I am still of the old guard that I do tend to still like to stop and summarize my agents.md. But I know that some of that is my stubbornness at this point and that often you can just trust the compactor. And so I'm here to tell you, don't be like me.

At least start out by trusting the compactor, trust compacting, let it do its thing and it will often do a really fine job of summarizing the conversation history, keeping relevant stuff that it needs to remember and freeing up tons of space for more conversation. That's what it does and it tends to do it well. And maybe one more point to mention on context windows is just to tell you the context window size of different major models.

So open AIs, GPT 5.2 that we used yesterday. yesterday, that has a context window of 400,000 tokens, 400,000 tokens, Claude, the Claude Sonnet 4.5, Claude Opus 4.5, that has 200,000 tokens, so about half. And Gemini, and the Gemini in Antigravity from Google, that has a context window of a million tokens, a million tokens, much greater.

So these are the limits of you.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

So to say getting this right is everything, it's almost like obvious that of course it's everything. That's all it has. It's got that input.

## Practical tips

- And so getting it right is what this game is all about. We used to call that prompt engineering. Remember when prompt engineering a couple of years ago was like a job that people could have and it was the idea that you had to figure out the best way to prompt an LLM.
- But really that term prompt engineering has evolved into this bigger term context engineering which is recognizing it's not just about the prompt, it's all other things like the kind of tools you give it and other things that surround it to make sure that you're doing the best job you possibly can do to give the LLM all the right information in the context so that the output is most likely to achieve your goal. That whole set of techniques is what's known as context engineering. And there were a lot of different components of what goes into this input context, this input to an LLM.
- And then there's something that is sometimes called the memory. And this is basically information that you want to persist across potentially multiple different conversations. Some people call this long term memory or medium term memory, but this is typically general Resources that can change over time, but the you'd want to always be able to come back to and Then there is the big part of it Which is basically the the the actual input that you're sending to the LLM But remember because of the this way that we have this this trick that that allows us to give the illusion of a memory.
- You know that it's not every single time. It's more complicated than that. But never fear, we will get to that.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

It can't go above that number. But it's again worth pointing out that you'll see degrading performance as you start to put more in the context. So personally, I don't over obsess about these max context window sizes because I'm more interested in how is performance affected by putting more into the context. And I find across all the models that having less in the context gets better results.
`;export{e as default};