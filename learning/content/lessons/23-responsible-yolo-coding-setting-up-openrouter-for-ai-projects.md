# Responsible YOLO Coding Setting Up OpenRouter for AI Projects

> Week 1 · Day 4

## Overview

Now, we're about to get to YOLO mode, which is great fun. And we're a lot of the pizzazzes right now, but I do want to keep things balanced by giving you some of the other counterpoints as well.

And one of them is this great blog post by Anthropic. They always have great blog posts.

This one is about how AI assistance impacts coding skills formation. And really this speaks to that point I just made about junior engineers and how important it is that you keep learning.

## You will learn

- Understand the main ideas covered in **Responsible YOLO Coding Setting Up OpenRouter for AI Projects**
- Follow the practical walkthrough from Week 1, Day 4
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

I thought this was a very thoughtful post by anthropic because it's clearly kind of, it's anti-anthropic in a way, it's been very balanced. And what they do this, they study a room full of junior coders and that are using AI assistants to help with a task and those that are not using AI assistants. And at the end of it, they find that there is a significant difference in how the population understood the underlying technology, a library that they got to use.

They gave a quiz to both parties and the people that used AI averaged 50 a small actual productivity improvement in this case, because of the type of challenge, but it had a significant detrimental effect on the learning ability of the junior developers that were working on this. And so that's a sobering point that we should all keep in mind. And another sobering point, which is particularly relevant for yoloing, comes here in the form of this article.

Jellyfin is a popular open source media streaming platform that lots of people contribute to. And they put out this policy for people who contribute code to Jellyfin that are using AI to generate the code. AI assisted development.

They have a policy on it. Let me show you a few things about it. Okay, in the first paragraph, it says the rise of LLMs has been significant, the power and flexibility of Cloud Code, given a lot of functionality to experienced and new developers, but there are trade-offs, it says, there we have it, it says, "We are seeing a precipitous rise in contributors using AI within the Jellyian ecosystem, as well as criticism and concern about LLMs generally.

And it says these are going to lay out the policy to address what we expect and desire. Okay, what is this policy? First of all, LLM output is prohibited for them in direct communication, like writing issues or comments, feature requests, pull requests, forum posts with the exception of translations.

It's great that they said that. They have an interesting catch there that you can read. But it's great that they said that.

So of course it's good to translate and you should say that you're translating. It's good to do that with an LLM. It's when people generate content with LLM's.

It's like the PR, why they're doing it or what they're doing. That is something which just generates extra work and noise for everyone around them. OK, so that's about communication.

What about the actual code? So I'm going to read this out verbatim, because I think it's important that we all hear this and keep this-- take this to heart. The use of LLMs for code is controversial and open to much interpretation.

These guidelines are our best effort attempts to ensure that knowledgeable developers who seek to use these tools as legitimate aid are not overly hindered while also preventing a flood of slop contributions that violate our core ethos. Wow okay what what are these these are rules then. So first of all, contribution should be concise and focused.

If it claims to target X is touching unrelated Y and Z, it will be rejected. Okay, a PR must be broken to small manageable commits. A PR is the name of like a change request.

Formatting and quality standards must be upheld. Do not commit LLM meta files like.Cloud or of course, agents.md. You must review the output and be able to explain it yourself without LLM output.

You need to be able to explain it yourself without LLM output. You need to be able to explain it. What is being changed and why?

If you can't explain what the LLM did, we are not interested in the change. How about that? And now the other ones are actually all common sense stuff.

You must test it. You must be able to take feedback. You must have an in depth level of understanding and the final discretion is with the reviewers.

And it ends with, the golden rule is this. Do not just let an LLM loose on the code base with a vague vibe prompt and then commit the results as is. This is lazy development and will always result in a poor quality contribution from our perspective.

### Deep dive

And we are not at all interested in such slop. Make an effort or please do not bother. And again, you are free to use LLM's to assist you but not as a sole source of code changes.

And there's lots of interesting stuff about how they would go about enforcing this, particularly saying it's not their place to try and evaluate whether something is LLM generator or not, and it doesn't matter if it is. What matters is the quality of what it produces. The reason I take you through this, I think this is actually really well written, I think it is brave of them to be so upfront about it and put in writing what a lot of us feel, which is this sense of the asymmetry that it is so easy to generate tons of LLM code and then just submit it out somewhere.

And the owners falls on the senior people then to go through it and try and digest it and understand what's real, what's the signal and what's the noise and see through these endless read-mees with lots of emojis. That's how the wait has shifted and that's not fair. It needs to shift back.

The people that are generating the code, which is going to be you and me for the next two and a half weeks, it's up to us to generate concise good code that we understand back to front. And so whilst today is all about YOLO and it's great fun and I encourage it, it needs to be done very much in this spirit. The code needs to come from us, we need to own the code.

And with these trade-offs firmly in mind and with a mantra that we own the code, I am still a massive fan of course of using coding agents to build a code. We'll be doing so to great effect over the next few weeks and at all points we will be owning the code. And so now we're going to do some real yoloing after all of this nay saying, we're going to go and let a model at it a few things to keep in mind.

First of all, everything that I do is optional. You can do different things if you want. This is a choose your own adventure moment.

Take it in what direction you want. Your results might be completely different and that's okay. That's what this is about.

And if you've hit problems, the trick is to simplify. Just pair things back. Delete everything.

Start again with a simpler mandate. Keep it as simple as possible. Always keep that in mind.

With that, we are going to go and build our project. Let me tell you about it and then we'll go and do it. So for this incredibly simple project, we are going to build a personal portfolio website complete with a digital twin, something I cover in many of my other courses, a chat bot that can answer questions about you and your career, like a complete, robust portfolio, personal site, digital twin, all in one go.

We're going to do it, vibe coding with YOLO, so that we do nothing, we just set it off and let it go. That's the plan. And to start with, we need to actually, so this is going to be a coding agent that's building something, which is going to have AI in it as well.

It's a bit confusing. It's an AI building AI. So we are going to need to set up an ability for you to make AI calls in the cloud, which you might have done before a lot of times, or it might be the very first time you're doing it.

And I'm going to suggest that we use a platform called OpenRooter because it allows you to access free models and paid models and it's super easy to use. So that's what we're going to go and set up right now. But if you're already an open AI user and that's what you use and you've got an account and you've got credits and an API key, we can just use that too.

If you do that, then you know exactly how it works and just simply replace OpenRooter with OpenAI. But for the people that are doing this for the first time, let's go to OpenRooter right now. I'm going to take you to their website, which is openrutor.ai.

Let's go there now. So open rutor is this great service, a provider, which lets you call different frontier models in the cloud. Back in the day, if you wanted to call models like open AI and cloth and anthropics, Claude and Google's Gemini, you needed to set up accounts with each of those companies.

You'd need to put some money on there, like a pay as you go, moneyed a top up amount that you put there, and you need to have like an API key, which is like your password, and connect to each one and write some code to do that. An open router came along and said, "Hey, we can be the person in the middle. "Just have an account with us, "and tell us which model you want to call, "and we will route to that model." And that's so convenient, and it allows you to use free models in the cloud, or paid models, all with one account.

### Putting it together

Of course, if you to use free models in the cloud or paid models all with one account. Of course, if you are using paid models, they do charge a small fee for that when you as you do your top up as you will see, but it's worth it because it's so convenient. And that's what we're going to use right now and it's going to also allow you to use free models if that's what you'd like to do.

Okay, so I have gone to openruiter.ai and you should as well and you should see this. And if you don't already have an openrooter account, then the first thing to do is of course to press sign up and then you come in and sign up and you use your Google credentials if you have them or whatever you want to have an account with openrooter and then I answer any questions it gives you as part of the sign up process and then you should get to the next screen. Here I am after logging in to OpenRooter, and on the top right is a usual kind of avatar menu, and here is a section called Keys.

And if I select this, I go to this place that has my API keys, and you won't have any yet, and you can press this Create API Key button. You can give it a name that can be anything you want, just something to remember like my nice key, but it can be anything you want, just something to remember like my nice key, but it can be whatever you want. If you're going to be using, if you're going to be putting on some money because you want to use paid models, then if you wish, you can put a limit here as to like, I don't want to spend more than $5 a month, then you could have it set like this.

So this is, yeah, yeah, this is the dollar limit each month right here. And you can also put an expiration on the key should you want to do that and then you can create the key like this and it then gives you a key right here and you're going to copy it into your clipboard and you might want to also save it just just on my temporarily safer if you have a password manager put it there but copy it into your clipboard we're going to need it in a minute and here's the thing you don't want to mess this up. Your key needs to be exactly this.

It needs to be this piece of text here, including this first SK-OR, which stands for secret key and open router-v1. This whole thing has to be there. And if you get this wrong by a single digit, then it won't work.

And I say this every time, and somehow there's always a steady flow of people that have problems with their keys because somewhere they've messed up getting the key like this into their code. And if it goes wrong, then it won't work. If it doesn't work, you can just come back and create another key.

You can have as many as you want, but you'll have to create another one, copy it and then use it because the key has to match. It has to be exactly right. And you could keep this screen up like this until we've pasted it in, where it needs to go in the next part.

Okay. And I'm now gonna, I've copied that. I'm now going to close this down.

I'm also going to delete this so that, because you've all seen my key. So I've now deleted it. And there's one more thing that I want to set up in OpenRooter.

If you're gonna be looking to use free models through OpenRooter, then you need to come to your avatar menu here, go to settings, and then down here go to privacy and guard rails and make sure these two things here are turned on. Enable free endpoints that might train on inputs because if you use models for free, you're saying, "Okay, but you may use this to train on otherwise they won't." And then enable free endpoints that may publish your prompts because it's a lot if you're going to use free models again, then you're giving up the privacy angle. So those two things should be turned on.

Should you wish to use the free models in OpenRooter? So that's one thing to be aware of. And for those that would like to use a strong model for your digital twin, you can come to the avatar menu and go to credits.

And this is where you can add some credits in here that you could spend against. And whilst some of these providers have a $5 minimum, OpenRooter is much more friendly. Last time I tried it at least, I don't have anything in here, last time it was a $2 minimum.

So for just $2 minimum, you can then put that down and then draw down against it super convenient. So it should you wish it's completely optional. You can put some money on this.

This is going to be used by your digital twin to answer career questions about you to people that go to your website. Okay with that open router is set up.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

I thought this was a very thoughtful post by anthropic because it's clearly kind of, it's anti-anthropic in a way, it's been very balanced. And what they do this, they study a room full of junior coders and that are using AI assistants to help with a task and those that are not using AI assistants. And at the end of it, they find that there is a significant difference in how the population understood the underlying technology, a library that they got to use.

## Practical tips

- What about the actual code? So I'm going to read this out verbatim, because I think it's important that we all hear this and keep this-- take this to heart. The use of LLMs for code is controversial and open to much interpretation.
- These guidelines are our best effort attempts to ensure that knowledgeable developers who seek to use these tools as legitimate aid are not overly hindered while also preventing a flood of slop contributions that violate our core ethos. Wow okay what what are these these are rules then. So first of all, contribution should be concise and focused.
- Formatting and quality standards must be upheld. Do not commit LLM meta files like.Cloud or of course, agents.md. You must review the output and be able to explain it yourself without LLM output.
- And it ends with, the golden rule is this. Do not just let an LLM loose on the code base with a vague vibe prompt and then commit the results as is. This is lazy development and will always result in a poor quality contribution from our perspective.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

You have copied the open router key into your clipboard. Maybe you still have that open. You can always create more API keys if you wish. It's time for us to start coding.
