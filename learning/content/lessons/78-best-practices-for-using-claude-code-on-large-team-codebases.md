# Best Practices for Using Claude Code on Large Team Codebases

> Week 3 · Day 3

## Overview

Okay, so onto the main topic of the day, which is about how you best use these kinds of advanced coding agents if you're working on a large team with a big code base. And this is where historically they've been criticized, because things like Cloud Code work really well with great market data demos like the one you just saw, when there's a nice, defined, small project it's building from scratch, it can write the docs, where they can struggle is when they're suddenly inheriting a massive code base.

And to be honest, this is less true now, now that we are past the point of inflection from last November, now they are much better at handling massive code bases. But there are still rules of the road, there are still some good practices, which allow you to be successful as a large team and I'd like to go through them with you now.

And I should warn you that in most cases I'm really stating the obvious here. I feel like by this point in the course you already know this stuff pretty well.

## You will learn

- Understand the main ideas covered in **Best Practices for Using Claude Code on Large Team Codebases**
- Follow the practical walkthrough from Week 3, Day 3
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

We're basically talking about focusing on the top half of those kind of six ways of doing things on the yellow, on the 2025 techniques more than the purple 2026 crazy techniques. So first of all, invest time in your agents.md or your Claude.md in your documentation, which is disclosed progressively only as you get to the subdirectories. Make sure that at every level, at every subdirectory, there is great documentation that it reflects the interface.

It reflects what an agent would need to know in order to work within this directory, this folder, without having to read all the files. So it should be like really a good, tight documentation that reflects the package and what's needed to be known as soon as one goes inside it. And then, you know, making sure that it is at the right level of detail, not so much detail that it consumes context, but enough so that the right core functions are called in that package.

That is the trick and it takes time and effort. You can get, of course, Cloud Code to write this for you, but then you need to eyeball it and make sure you're satisfied with it. Do a couple of rounds of reviews.

Invest time in your agents.md, it will pay dividends. And also, project documentation for agents is what it's all about. If you have a document that you tag with the @ sign, then that gets inserted into, in an entirety, into that outer document, which is not normally what you want.

Better is to describe what a document does and then put a link to it because then Claude Code or the other coding agent can decide does it need to know about this document and if so it will read it. So structuring your documents to be summarizing and then to be pointing to more detailed documents so that an agent can navigate properly. That is a key to success with big code bases and taking time to get that documentation and making sure that it's up to date as changes happen, always make sure there's a step when documents are revised and updated.

And then having a consistent strategy for how you will work as a team using coding agents. So for example, if you want to use the GitHub approach where you will tag Claude, then have that be the policy, have that be the way that you're gonna work as a team. If everyone's approaching it a bit differently, things can become a complete muddle.

You're not sure who's following what process, who is it that's putting tickets in JIRA, and then you're using one flow for this, who is it that's using the GitHub actions and tag in Claude. So you wanna have one consistent flow, one agreed process that everyone follows. And if you're going to use plugins, which makes a lot of sense, like the feature dev plugin, that I guess we used a couple of weeks ago now, a week ago, then have that be something that you all agree to and you rally around and it's part of your project process.

And that way you'll have common, you'll have consistency across the project and also everyone knows when you're going to order a new feature what's the right way to approach it. So when it comes to choosing things to add on for your project, I would focus on plugins first and foremost, like add the right plugins like maybe the code simplification and the feature dev and a few others that make sense for your project. When it comes to building specialized functionality for coding agents to use on your project.

### Deep dive

I recommend focusing on skills as a thing that makes so much sense right now. Develop skills, special skills that make sense for your project, how common things should work in your project. An example, this bit of an obvious example might be the cerebras skill that we wrote.

If you particularly want to use that approach for LLM inference in your project, then build that out as a skill. But that's a bit of a bitty thing to mention. I'm really thinking of bigger skills you might want your agent to know.

Ways in which it has to understand the frameworks that you're using on your project and making sure that that's something that has a special skill that is that is domain specific. If, for example, you were using a particular technique for market data that mattered, then you might have a skill around that. So it was very clear, the right way to use the market data API throughout your project.

So building special skills is a great way to have common standards, common approaches that you know will be reinforced for all development across the project by coding agents. And the next one is stating the obvious, I'm afraid, but having a robust test suite, of course, it's like likely to always-- I mean, test driven development, of course, is well known as being something that is incredibly important for large projects and having 80% unit test coverage for a long time has been the kind of gold standard. I sort of suggest, though, being less focused on things like the percentage coverage of your tests, LLMs will often focus on that, and they will often, to a fault, do things like mocking out, if you're familiar with this, that the right tests that are very, very specifically designed to make sure that every path through the code is tested, and that's not really what you want, and you certainly don't want brittle tests that are overly mocked.

You want good tests. You want tests that actually test the functionality you're trying to build such that if there's some reimplementation, it doesn't break your tests. But if there's something that actually does break the logic, then it breaks the tests.

So I'm making sure that you have, that you give feedback on the testing strategy, maybe as part of your agents.md. That's very important and always pushing back if you see a ton of tests getting put in there, just for the sake of testing, mocking everything out and just making sure that different parts through the code are tested. I mean, that's what you would do as a human review as well, and that's what you should do, particularly with coding agents.

And there's a lot of overlap here because really that second item about having consistent workflows and plugins, that should include having the kinds of workflows and instructions to alarms that make sure that they write good tests that don't overly mock. Okay, and then finally, of course, at the end of the day, you are responsible, you are accountable for the quality of your code. Your coding agent is a tool that is helping you, you and your team.

And so there needs to be a culture of there being a human reviewer, the buck stopping with the human and a strong culture of rejecting coding agent slop. If they are writing long, long files that are just going to be a hard work to review, if they're being overly defensive, all of these things need to be caught and fixed. And the, you know, there's definitely this asymmetry problem that is becoming increasingly easy to generate tons and tons of code and the, the onus is becoming on the human to then take all of this code and have to review it, which, which is hard work.

### Putting it together

It's very hard work. And, and so making sure that there are disciplined processes in place to make sure that that human review happens and making sure that coding agents are challenged to write succinct code that doesn't overwhelm the human reviewer. These are all priorities.

And there's tons of other good advice and you'll see lots of articles about this stuff and some of the good advice will become no longer relevant very quickly as the models get stronger and stronger. But one of the things that I would certainly add to this list would be to always work with bite-sized chunks. When you're dealing with a massive project, you don't want to tag Claude and say, "Hey, refactor the whole codebase," because you're asking for trouble.

You could do that with a small project. We could do it with our little one that we're working on right now this week. But you can't do that if you've got a massive project with 50 people working on it.

So take small bits at a time, let a human or working with something like Cloud Code, divvy up a big piece of work into smaller steps, and then assign the small steps to the coding agent, have each one be something that is independently, can be specified, can be tested, can be reviewed by a human. So taking it in small steps, absolutely crucial. And this is very much an evolving story.

If you have your own advice from your own experiences, please do post them in Udemy. It'll be great to have conversation about this. And if you want to have a quick assignment, one thing that's quite entertaining to do is to take a big open-source project.

Maybe something from your domain, maybe something that One thing that's quite entertaining to do is to take a big open source project, maybe something from your domain, maybe something that's from whatever industry versus you work in, a popular open source platform, and then clone it and then try and take on like something that's got to do or something like that. Ask the LML to find a to do in the code and do it and see how it does. And then work on things, some of these steps here, work on a more detailed agents.md across all of the entire directory structure, work on perhaps the feature dev plugin and put some of these things into practice and see how it does.

And you could also, as a sort of anti-test, you could try the kind of, hey, refactor the whole code base and see what happens.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

We're basically talking about focusing on the top half of those kind of six ways of doing things on the yellow, on the 2025 techniques more than the purple 2026 crazy techniques. So first of all, invest time in your agents.md or your Claude.md in your documentation, which is disclosed progressively only as you get to the subdirectories. Make sure that at every level, at every subdirectory, there is great documentation that it reflects the interface.

## Practical tips

- We're basically talking about focusing on the top half of those kind of six ways of doing things on the yellow, on the 2025 techniques more than the purple 2026 crazy techniques. So first of all, invest time in your agents.md or your Claude.md in your documentation, which is disclosed progressively only as you get to the subdirectories. Make sure that at every level, at every subdirectory, there is great documentation that it reflects the interface.
- That is the trick and it takes time and effort. You can get, of course, Cloud Code to write this for you, but then you need to eyeball it and make sure you're satisfied with it. Do a couple of rounds of reviews.
- Better is to describe what a document does and then put a link to it because then Claude Code or the other coding agent can decide does it need to know about this document and if so it will read it. So structuring your documents to be summarizing and then to be pointing to more detailed documents so that an agent can navigate properly. That is a key to success with big code bases and taking time to get that documentation and making sure that it's up to date as changes happen, always make sure there's a step when documents are revised and updated.
- So building special skills is a great way to have common standards, common approaches that you know will be reinforced for all development across the project by coding agents. And the next one is stating the obvious, I'm afraid, but having a robust test suite, of course, it's like likely to always-- I mean, test driven development, of course, is well known as being something that is incredibly important for large projects and having 80% unit test coverage for a long time has been the kind of gold standard. I sort of suggest, though, being less focused on things like the percentage coverage of your tests, LLMs will often focus on that, and they will often, to a fault, do things like mocking out, if you're familiar with this, that the right tests that are very, very specifically designed to make sure that every path through the code is tested, and that's not really what you want, and you certainly don't want brittle tests that are overly mocked.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

Simplify everything. You could maybe put that in a rough loop and leave it going for ten iterations. See what comes out the other end, but it's probably not gonna be pretty. And that will give you a good sense of what does work and what doesn't work with a massive code base.
