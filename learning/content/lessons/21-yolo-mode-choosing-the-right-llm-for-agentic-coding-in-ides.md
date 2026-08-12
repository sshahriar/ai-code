# YOLO Mode Choosing the Right LLM for Agentic Coding in IDEs

> Week 1 · Day 4

## Overview

And welcome to week one day four. It is a blue day, which means it is a projects day.

We already spent time with cursor, co-pilot, codecs, anti-gravity. You've seen that they're all quite similar with their little nuances here and there.

It's now time to put one of them to work and to do it on YOLO mode. Let's do a quick recap first.

## You will learn

- Understand the main ideas covered in **YOLO Mode Choosing the Right LLM for Agentic Coding in IDEs**
- Follow the practical walkthrough from Week 1, Day 4
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

So as a quick recap, we worked with four different IDEs or plugins, ID plugins yesterday. And first up, we use cursor. Cursor is made by any sphere.

That's the name of the company behind cursor. You don't hear that so often. You get cursor.

You sort of think that cursor's the name of the company as well, but it's not. And cursor itself is what they call a fork of VS code, which means that VS code is actually open source software that Microsoft has open sourced, and you can take that and make your own version of it, and that's what Cursor, that's what any sphere did, and they made Cursor, and so it looks and feels very like VS Code, but it is a different fork of it. After Cursor, we looked at GitHub co-pilot, and there are different ways to use GitHub co-pilot, but the most common and the one that we did was using it as an extension, a plugin to the original VS code, the proper VS code.

So we didn't, it isn't a fork of VS code, it's a VS code with an extension loaded in to get you, give you GitHub co-pilot in the agent chat screen. That's what we did. And after that, we then used codecs.

And again, there are different ways to use codex one of the ways, perhaps not the most common way actually but by the way we did it is to use it as an extension in VS code just like GitHub co-pilot and the extension looked a bit different and it had that little icon here to click on to bring it up But otherwise there was a lot in common in some ways it was similar both codex and GitHub co-pilot We use them as extensions within VS Code. And when I said it's not the most common way, it's because the most common way is to use it through the command line interface, the CLI, which is what we'll be working on next week. And then finally, we used anti-gravity, the IDE from Google, and this is rather like cursor.

It is its own clone, its own fork of VS code, a separate application that they have built, forked off VS code, as you saw, and that's anti gravity. And we use that too with great results. And when I say with great results, it's important to distinguish the IDE, the tooling we used from the LLM, the model that was being used as the agent to help us within that tooling.

And we used a bunch of different LLMs, whether you're aware of it or not. So one of the ones that we probably used is an LLM called Composer, which is a proprietary LLM that any sphere the makers of cursor have made. And I say probably, because we had cursor on auto mode, which means we were saying, Hey, you can choose which model to use.

And at least as of now, it doesn't like to tell you what it actually uses, because they want to keep that somewhat opaque so they can feel free to switch things up. And because they want to be able to do that and not have you worry about which model is being used to generate the code. And so we almost certainly were using Composer, which is Enysvir's own model.

It's what they call a fast frontier model, which means it is considered a leading model, but of the sort of small fast camp. It generates stuff really quickly. It has an ordinary 200,000 context size, which is fairly usual, the same as Claude.

### Deep dive

And it's seen as a lower end, but very quick model. And that's probably what we used with cursor. We also probably used Claude Haikou for 0.5 which is the name of the fast frontier model from anthropic.

It's the smallest fastest of the new models from anthropic. You might have a higher number by the time you're watching this but probably still with Haikou. It also has a 200,000 context and it's probably quite similar to composer, perhaps a bit more powerful.

And that is one that we were also on auto mode with co-pilot. And so we don't know for sure. It might have been using Claude Sonnet 4.5, which is a more powerful model, perhaps also from anthropic.

That's that would be another one. Then when we used codecs, we did of course use a version of GPT 5.2, the strongest model for me, and we used a special version that's called GPT 2 5.2 dash codecs. It's confusing because codecs are both places, but it's because it's been specially trained to be really good at being used within codecs for generating code.

That's what we used that has a 272,000 context window, and it's our really, really great model. And sure, it works really well for us. And last but definitely not least, we had Gemini 3 Pro, the strongest version of Google's models.

At least for me, it's a top frontier model. They have a fast frontier called Gemini 3 Flash that you might have used. But Gemini 3 Pro and Flash, they both have a million context window, a huge context window.

They are very powerful models. It's perhaps not considered as strong as GPT 5.2 codecs, but it has a much longer context window, which gives it other benefits. So they are both, perhaps, neck and neck when it comes to their overall usefulness for this kind of practice.

So it's important to distinguish between the four different IDEs we used, or IDE plugins, and the four different models. And the different IDs, most of them can hook up to all of those models. We accept Composer is only available in cursor, of course.

But generally, you can switch around the models. As you saw, if you're paying for a plan, or you can pick a more expensive model, then you can do so. So there is this idea that there is two decisions to be made.

### Putting it together

Which IDE, which tooling do you feel comfortable working in? And then much of a muchness, you know, they have maybe one has an agent.md and the other has.agent/rules, whatever. There's a few different bits and pieces here and there, but they're basically and agentic platforms that let you repeatedly call an LLM in a loop to achieve a goal with tools.

That's what they're each doing. And then what really matters, the big decision is what LLM are you using to actually make the decisions. And that is where you want to spend your time and choose your money wisely.

And on that note, I've got some practical rules of thumb of things to keep in mind so when you're making a decision about the model to pick. First of all, I would personally always tend to favor a smart model over a fast model. I would rather wait and let it do, give an accurate, high quality answer than let it rattle something off and then find it as broken and then iterate and it's broken.

I tend to find that it's a more pleasant experience and ultimately you get to a faster outcome if you favor intelligence over speed. I would also suggest set a budget for whatever work you're doing and then try and pick the most intelligent model that your budget supports. I find that trying to save extra money by using a cheaper model usually ends up costing more because of the extra iterations and the time drain.

So try and pick the strongest model you can afford. If you're going to have smaller models, particularly free open source models, you need to allow for more precise prompts, much more detailed prompts, very much think like you're setting a spec, a detailed spec, and you need to give significantly more oversight. And that leads me to the final point, which is if you're going to be doing YOLO, as we are today, when you just kick something off and you let it be, you let it run, then don't do that, in my opinion, with fast frontier models or with low-end open-source models.

Maybe you could be the really biggest open-source models, but be wary of that. And I'm not saying that particularly from the risk points of view. The risk is there, you need to be to be watching, but that's probably not my greatest concern.

It's really just from a time and productivity point of view. If you're going to YOLO, the chances are so high with a smaller model that you'll let it go, you'll come back later and you'll just have a pile of nonsense.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

So as a quick recap, we worked with four different IDEs or plugins, ID plugins yesterday. And first up, we use cursor. Cursor is made by any sphere.

## Practical tips

- That's the name of the company behind cursor. You don't hear that so often. You get cursor.
- It is its own clone, its own fork of VS code, a separate application that they have built, forked off VS code, as you saw, and that's anti gravity. And we use that too with great results. And when I say with great results, it's important to distinguish the IDE, the tooling we used from the LLM, the model that was being used as the agent to help us within that tooling.
- And that is one that we were also on auto mode with co-pilot. And so we don't know for sure. It might have been using Claude Sonnet 4.5, which is a more powerful model, perhaps also from anthropic.
- So it's important to distinguish between the four different IDEs we used, or IDE plugins, and the four different models. And the different IDs, most of them can hook up to all of those models. We accept Composer is only available in cursor, of course.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

That is our high risk. If you're going to be working with fast frontier models, then I recommend that you do things step by step, baby steps at a time, while you work through a problem and checking at each point and approving as you go with your eyes on the diffs, as you go through eyes on the differences as it makes changes to the code on the edits, making sure that you are watching each one. That's the right approach for fast frontier. But if you're working with the top, top models, the frontier models like GPT-52 codecs, Gemini-3 Pro, and of course, the Claude Opus 4.5, my favourite of all, then you can YOLO and you can get great results.
