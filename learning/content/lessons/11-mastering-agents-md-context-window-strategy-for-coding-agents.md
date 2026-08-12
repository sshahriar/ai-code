# Mastering agents.md Context Window Strategy for Coding Agents

> Week 1 · Day 2

## Overview

Oh my goodness, I warned you that this was going to be all me talking for today. But thank you for bearing with me.

We're most of the way through. And I know for some of you, this is all old news as I say, but hopefully there's some interesting things there.

Maybe you disagree with me on some points, and which goes, please do put it in the Q&A. Nothing a lot more than good debates.

## You will learn

- Understand the main ideas covered in **Mastering agents.md Context Window Strategy for Coding Agents**
- Follow the practical walkthrough from Week 1, Day 2
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

Agents.md, I've mentioned it several times. This, of course, is the file which you use to give to prep your LLM with some information it's particularly it's used by coding agents. And it's a markdown file.md is your markdown, which is a sort of shorthand form.

It was it's sort of inspired by by thinking of a way that we could have something that could represent an HTML page, a web page with a sort of simpler, more human readable and writable version of it rather than all of the tags you see in HTML. So, the simple idea of this, if you're not familiar with Markdown, is that if you see like a hash, a single hash, like it says there with hash project summary, that means a big heading, an H1. Two hashes is like an H2, three hashes is like an H3.

So it lets you have a sort of hierarchy of headings. And otherwise it's pretty simple, numbered lists, hyphens for bulleted lists, that kind of stuff. You pick it up fast.

It's like a text file with some useful extra characters to show like a mark up, styling. And this is a format which LLM's love. They love markdown because they've been trained with lots and lots of Markdown.

They've generated lots of Markdown, so they just love making Markdown files and they love reading them and they're easy to write as well. So it makes absolute sense that we would use these kinds of Markdown files to prep our agents. And you write them in natural language style, just like you might write a prompt to an LLM, which means you want it to be nice and concise and crisp and assertive and not have too much ambiguity and really have as much signal as you can in the words that you use.

That's some of the tricks. This, of course, gets squashed into your context window, so this is precious space. So you don't want to be verbose.

You want to make every word count. And so as I say, it's a markdown format file. It gets included in the context for the agent.

And you typically have one of these files in what's called the project root directory, which is like for yesterday was the directory called instant. It's the directory at the top of your project. And that file will get read in and included in the context for the LLM.

But you can also have another agents.md file in every subdirectory and at any level of nesting at a subsubsubdirectory. And in that case, that agents.md file will only be read in when the agent is working on files in that subsubdirectory or any further sub-directory. So it reads in when the agent is working on any file, it will read in the agents.md in that inner directory, and then it will work backwards through all the parent directories, making sure it's got all of the relevant agents.md files in context.

And that's why I said that it's not true to say that agents.md are always included. They're always included if it's in the project route, but when it's in a sub-directory, it's only included if the agent is working on that subfolder. And typically, information that you put in the most inner agents.md overrides information in any outer directory.

So you can be more specific. There's a new rule that should override the general rule. You put that deep down in a sub-directory.

### Deep dive

So that's how this sort of hierarchy of agents.md files works. And if that's not clear to you, don't worry because we'll be doing plenty of it in the next few weeks. And I say agents.md and that is in fact exactly the name of the file.

If you're using cursor or codecs or GitHub co-pilot. Claude Code uses something called Claude.md and Antigravity uses something called Gemini.md. But it's the same idea, a markdown file that tells the agent what to do that you could have in the project route or in any subdirectory.

And I should mention that cursor and GitHub co-pilot have other kinds of files as well, like cursor has these things called rules. But the trend that I see is that in time, everyone is converging on these agents.md. So while there are still people that use Kerse rules that generally speaking, more and more, people are just focusing on agents.md, that's become the kind of de facto standard agents.md or claw.md or gem.net.md.

That's how people are doing things these days. But there are some other approaches too that some of the tools have specifically for those tools. So look, we're gonna spend a lot of time looking at what makes a good agent.md and what makes a bad agent.md and it's best to see that stuff in practice.

But just to give you a few bit of a sense of it, you can see here the kinds of things that I tend to try and do in my ages.md. I obviously focus on giving it the overall project dolls and the success criteria. I like to give it a checklist that it can check things off on the success criteria so that it's really forced to go and do that.

I also often list links to other documents that it can optionally load. We'll cover that in due course. And then I like to have the clear coding standards that apply to this project.

And here it's so important to be concise, to be specific, and to try and correct for problems that you've had with the agent in the past. And of course, this is such an evolving space, and things that are a problem for me now may not be a problem anymore for you. But for example, I hate the way that these AI agents tend to over complicate everything.

So I always try and stress, simpler is better, not too many comments, comments only when necessary. Be concise, have short readmes, I hate the way that LLM's love generating long, wordy readmes. I used to be so happy when people would send me PRs with code for me to merge into my open source repos.

And then we'd have all of these lengthy readmees. The first time this happened a couple of years ago, I thought, "Wow, that's so kind of that person to write this long readme. And now I know better." These LLM generated readmees are just the worst.

Don't do that, please. So I always tell LLM to make readmees short and no emojis. Please, no emojis.

And then I say important. It turns out that it works well to put the word important in block capitals. Who knew?

### Putting it together

Important avoid over defensive programming, avoid is instance checks in Python, just horrible hacky stuff. Only manage exceptions when necessary. They loved to put tries around everything.

And then for me, because I use UV the Python package manager, I might say use UV always UV run something rather than Python three something always never. And so you can see some different stylistic things there. You probably know this already, but use back ticks to wrap around code like that one back tick.

If you have some some inline code, just a little bit of code, and you do three back ticks if you've got a whole block of code, three back ticks, code and another three back ticks. You don't need to remember this because we'll be doing plenty of it. Just gives you a sense of how this works.

And one final tip people tend to say for these things, try and focus on the positives, try and focus on things that it should do. Don't do too many negatives like like I have there never Python 3. You can use it from time to time but not too many because allalands aren't so good at handling negatives, strangely, that they're not so coherent at remembering things that and try not to have too much of like do not over-complicate that I got in here.

But you don't want too much of that because they tend to be less coherent with it. Focus on what it should do, less of what it should not do. And so, a final point that I'll make here is that there was a school of thought last year, and the school of thought very much was, look, your was look your success with agent coding is from spending time with a really really excellent agents.md that is where you need to sweat you need to put time energy effort into agents.md you need to have one at the top you need to have one in different sub directories you need to work on making it really really good and have other documents that support it.

You need to continually supplement with extra files, extra planning files, success criteria, steps that need to be taken to test. You need to continually rewrite your agents.md again and again pruning it, removing things that don't matter anymore, adding in new things. And indeed, you can have your LLM rewrite it for you, but be giving it very clear instructions because it is precious.

And every line counts and LLM's love to add to agents.md and you need to make sure that it's tight. And often stop your AI agent, rewrite, prune, and then reset and store your agent again fresh context completely clear and new agents.md That is it's hard work but that certainly as of last year was the prevailing way to get the most value out of AI agents. And you can probably tell there is a new way, a new school of thought, and the 2026 mindset.

It's a kind of let it hang out. Be more comfortable giving up the reins, let it go. You focus on the end goal, focus on you what you want the LLM to achieve at the end of it.

Use some of the new features that we will cover over the next few weeks, skills, having more loops, using agents, sub-agents and having a swarm of different agents, let it have the end goal, let itself correct and just let it be, let it do its thing. That is the kind of prevailing 2026 mindset, which is quite a departure from the 2025 mindset. And I get, I hate to break it to you.

I hate to break it to you, but I am still of the 2025 School of Thought. I think it's more nuanced than this. In a second, I'm about to take you through that there are different situations which lend themselves more to a different kind of strategy.

But personally, I am not ready to let go of the 2025 approach yet.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

Agents.md, I've mentioned it several times. This, of course, is the file which you use to give to prep your LLM with some information it's particularly it's used by coding agents. And it's a markdown file.md is your markdown, which is a sort of shorthand form.

## Practical tips

- That's some of the tricks. This, of course, gets squashed into your context window, so this is precious space. So you don't want to be verbose.
- And that's why I said that it's not true to say that agents.md are always included. They're always included if it's in the project route, but when it's in a sub-directory, it's only included if the agent is working on that subfolder. And typically, information that you put in the most inner agents.md overrides information in any outer directory.
- So that's how this sort of hierarchy of agents.md files works. And if that's not clear to you, don't worry because we'll be doing plenty of it in the next few weeks. And I say agents.md and that is in fact exactly the name of the file.
- That's how people are doing things these days. But there are some other approaches too that some of the tools have specifically for those tools. So look, we're gonna spend a lot of time looking at what makes a good agent.md and what makes a bad agent.md and it's best to see that stuff in practice.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

It depends on the project, depends on what you're doing, as we will discuss. But much of the time, for me, it's about the amount of work that I put into agents.md and to other parts of optimizing the context window, it makes an enormous difference to the output and I am not yet ready to let it go except for toy projects like a first person shooter that we did yesterday. I let that one go for sure but for larger projects I like to be all over it and at least for now I suggest the same for you but it's a changing time and increasingly. During the course of 2026 and beyond you should expect to see people more and more often being willing just to let it go.
