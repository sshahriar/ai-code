var e=`# How LLMs Work Tokens, Memory, and Reasoning Explained

> Week 1 · Day 2

## Overview

Well hello, welcome back. You survived week one day one and you're back for week one day two.

Thank you. It's a purple day.

There's that purple stripe in the middle there and that means that today is another theory day, our second theory day. And I've got two bits of bad news for you.

## You will learn

- Understand the main ideas covered in **How LLMs Work Tokens, Memory, and Reasoning Explained**
- Follow the practical walkthrough from Week 1, Day 2
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

One of them is that today is going to be a lot about me talking. I like these sessions to be mostly practical stuff doing things and today's going to be a bit of like theory and material, but I'll try and get through it quickly and it paves the way for lots of practical stuff to come. And the second bad thing is that today is going to be perhaps somewhat, it's going to be foundational, it's going to be some of the basics.

And some of you probably already know this stuff, in which case, please put me on 2x, steam through this, there'll still be some interesting bits I'll put in there for everybody but it is going to be reasonably foundational. If you are new to this then listen up there's some important stuff to cover today. Let's get into it.

And I am just going to start by level setting with the sort of basics like what is an LLM. I imagine everybody knows but let's just make sure we're on the on the same page. So a large language model such as GPT, of course, it is something which is designed to predict what text, what words should come after an input.

You give it an input sequence of words and it says what will come next. It's like autocomplete on steroids. And of course, we know that the way it actually works is it's basically this enormous pattern matching statistical engine.

It's been fed tons and tons of training data, example data from the internet and far beyond, and it's looked at all of this data, it's learned patterns in the data, and so it's got really good when it's given some input text at predicting what will come next. And of course I use the words there, but it's really what we call tokens. The input is actually a sequence of tokens where a token is a chunk of a few letters that often is a word but is often also a part of a word.

And so there's a sequence of these input tokens and the output from an LLM is not necessarily the most likely next token. We often say it that way. But what it actually gives you is the probability of every possible next token.

If the input is 2 plus 2 is, then the output, there's a very high probability that the output is the token for 4. But there might also be a probability of other words like the word bananas. But presumably that would be a very low probability.

2 plus 2 is bananas, is not a very common thing to say. It won't have appeared very often in the training data. But that's the idea.

The input is a sequence of these things called tokens and the output is the probability of the next token. That's what an LLM does. And I imagine you're familiar with this, but of course one of the ways that LLM's work is that they generate the output one token at a time.

So if the input is something like what is the capital of France, then the first word, the first token that it predicts to come next might be the word the. And then you pass in what is the capital of France, the, and the next token might be capital. And then what is the capital of France?

### Deep dive

The capital. And then what is the capital of France? The capital of France is, and then Paris.

And so it generates things one token at a time and the whole input is passed back in with all the tokens so far. And then it predicts the next token. And that is the way that LLM's are run, that process is called inference, and they run that way to generate the output one token at a time.

And if you want to know more about that, I have a sort of YouTube series that goes through this a playlist that I will include in the course resources. I imagine you know this already, but it's good that we're on the same page. Okay, that's an LLM.

And then also so we're on the same page, there is something different but confusingly sounding similar, called an AI application or an AI product. This is something that uses an LLM to achieve a business goal, but it's got software written around that call to an LLM. The distinction I'm trying to make here is that something like there's an LLM that's very well known that's called GPT that I'm sure you're familiar with.

GPT is an LLM, it's something which is a model that predicts next tokens. And then there is an AI application that's called chat GPT. And that is a piece of software that wraps around calling GPT.

And it has other functionality. It has things like a memory and the ability to search the web and other stuff built around using the GPT LLM. And chat GPT then is a classic example.

The cursor agent that we used yesterday is another example. If you use Duolingo to learn a new language, the Duolingo Max Plan has a premium feature that lets you chat with an AI in order to learn a language. That's another one.

You may be familiar with Atlassian Rovo, which is like Gen AI built into the Atlassian suite of products. There's so many different places where you will find Gen AI being packaged into an application. And the reason that I draw attention to this and all of the many others is just to draw that distinction between a software product, an application that uses an LLM from the LLM itself.

Keep in your mind separate, chat GPT the product from GPT the LLM which can be called to generate the most likely next token to follow a sequence, and that GPT LLM sits behind the chat GPT product. And ever since the release of chat GPT in 2022, we've all been a bit surprised that autocomplete, basically predictive text on steroids is able to show this apparent intelligence. It's able to do things like we saw the cursor agent do, and it's able to be like, like chat GPT, it's able to have an informed conversation with us.

It's very, very surprising. And there are a few tricks that underlie this. And in particular, there are four tricks that I want to highlight that are written in software.

### Putting it together

They're built around this call to this thing that just predicts likely next tokens. And let me quickly go through four of these tricks with you now. And the first trick, which is one, again, I imagine most of you are super clear on already, but let's get on the same page.

I call it the illusion of memory. And it's recognizing this very simple point, which is that every time that you use an LLM like GPT from OpenAI, it is completely stateless. GPT is a model, a data science model that takes an input sequence of tokens and it predicts what will follow that input sequence of tokens and it predicts what will follow that input sequence and it's completely stateless and that every time you call it with an input sequence it's got no knowledge of previous calls every call is a separate call and so if you write some code that just uses the gpt model and you say I'm ed and it replies hi ed and then you send another call to the LLM.

You then use the same LLM to put in a new input sequence, which is "Who am I?" It's going to respond with something like "I don't know, I don't have that information, that's the most likely text to come after "Who am I?" But wait, you say, that doesn't match my experience, I use chatgpt and for sure, it keeps the conversation thread going. If I say "Who am I?" it will say, "You're Ed, you just told me." Okay, well, you probably know this, but that is because of this trick, this sneaky little trick, which is, of course, that every time you call an LLM, you don't just pass in something like, "Who am I?" You pass in the complete conversation so far. So what actually happens with chat GPT, when you're using the product, chat GPT, is that you start by saying hi-ed, and it responds, hello-ed.

And then the next message that gets sent to GPT is the whole conversation so far. I'm ed, hi-ed, who am I, the next thing I've typed. And when that entire input sequence is sent in, of course, the LLM predicts the most likely next token is something like, "You're red, you just told me you're red." And that gives this illusion that chat GPT has a memory.

It is in fact just a byproduct of every single time the LLM is called, the entire conversation so far is passed in. Most of you knew that already, and if you didn't, you're like, " like oh I see and if you do something like my AI engineering core track we actually make these calls and you see it happening just in case you don't believe me. And the second trick that again people are pretty familiar with at this point is this trick called reasoning or thinking and this began out as this thing we discovered where when you were putting in this input sequence to GPT, if you put at the end of the input sequence, please think step by step.

You tended to get better outcomes, which was sort of surprising, and that led over time to this different way of working with LLMs, in which they were trained before they give you the answer to output the way in which they're going to come up with the answer. And it's very strange, but it turns out that as a side effect of generating tokens to describe what it's going to do, you end up getting better outcomes. And that sounds, it just sounds hokey.

It sounds too good to be true, and yet it works. And here's a sort of classic example, again, I do this on my AI engineering course, you could have the question, "Hey, you're tossed two coins. One of them is heads.

What's the chances? The other one is tails." And I show that when you run this with a model without it, outputting tokens to give its reasoning, it will give an answer like a half, 50/50, which is what you might instinctively think would be the right answer. But in fact, it's one of those annoying trick questions, which is a clever little trick.

You could ask Chachie Petit if you wanted to tell you why. But the real In fact, it's one of those annoying trick questions, which is a clever little trick. You could ask Chad GPT if you wanted to tell you why, but the real answer is two thirds.

And if you ask it to explain itself, if you want it to output how it will think about this first, and then come up with the answer, then it tends to get the answer right.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

One of them is that today is going to be a lot about me talking. I like these sessions to be mostly practical stuff doing things and today's going to be a bit of like theory and material, but I'll try and get through it quickly and it paves the way for lots of practical stuff to come. And the second bad thing is that today is going to be perhaps somewhat, it's going to be foundational, it's going to be some of the basics.

## Practical tips

- And some of you probably already know this stuff, in which case, please put me on 2x, steam through this, there'll still be some interesting bits I'll put in there for everybody but it is going to be reasonably foundational. If you are new to this then listen up there's some important stuff to cover today. Let's get into it.
- And I am just going to start by level setting with the sort of basics like what is an LLM. I imagine everybody knows but let's just make sure we're on the on the same page. So a large language model such as GPT, of course, it is something which is designed to predict what text, what words should come after an input.
- You then use the same LLM to put in a new input sequence, which is "Who am I?" It's going to respond with something like "I don't know, I don't have that information, that's the most likely text to come after "Who am I?" But wait, you say, that doesn't match my experience, I use chatgpt and for sure, it keeps the conversation thread going. If I say "Who am I?" it will say, "You're Ed, you just told me." Okay, well, you probably know this, but that is because of this trick, this sneaky little trick, which is, of course, that every time you call an LLM, you don't just pass in something like, "Who am I?" You pass in the complete conversation so far. So what actually happens with chat GPT, when you're using the product, chat GPT, is that you start by saying hi-ed, and it responds, hello-ed.
- It is in fact just a byproduct of every single time the LLM is called, the entire conversation so far is passed in. Most of you knew that already, and if you didn't, you're like, " like oh I see and if you do something like my AI engineering core track we actually make these calls and you see it happening just in case you don't believe me. And the second trick that again people are pretty familiar with at this point is this trick called reasoning or thinking and this began out as this thing we discovered where when you were putting in this input sequence to GPT, if you put at the end of the input sequence, please think step by step.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

It says two thirds, and it first says, "This is probably a trick question. I should think this one through." And it realizes, of course during this situation where you're not saying which one of the coins is heads and that means that in two thirds of the cases, the other one will be tails, look it up, it's sneaky. But that is this trick called reasoning or thinking. And it's resulted in much stronger models that are trained to generate tokens to think through what they're going to do before they do it.
`;export{e as default};