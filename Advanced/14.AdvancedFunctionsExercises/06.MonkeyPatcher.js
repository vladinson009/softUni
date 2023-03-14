function solution(command) {
    if (command == 'upvote') {
        return this.upvotes++;
    }
    if (command == 'downvote') {
        return this.downvotes++
    }

    let upvote = this.upvotes;
    let downvote = this.downvotes;
    let totalScore = upvote + downvote;
    let balance = upvote - downvote;

    function func() {
        if (totalScore >= 10) {
            if (upvote > totalScore * 0.66) {
                return 'hot';
            } else if (balance >= 0 && totalScore > 100) {
                return 'controversial';
            } else if (balance < 0) {
                return 'unpopular';
            } else {
                return 'new'
            }
        } else {
            return 'new';
        }
    }

    if (totalScore > 50) {
        const inflateVote = Math.ceil(Math.max(upvote, downvote) * 0.25);
        const newUpvote = upvote + inflateVote;
        const newDownvote = downvote + inflateVote;
        return [newUpvote, newDownvote, balance, func()];
    }
    return [upvote, downvote, balance, func()];

}




let post = {
    id: '3',
    author: 'emil',
    content: 'wazaaaaa',
    upvotes: 100,
    downvotes: 100
};
console.log(solution.call(post, 'upvote'));
console.log(solution.call(post, 'downvote'));
let score = solution.call(post, 'score'); // [127, 127, 0, 'controversial']
console.log(solution.call(post, 'downvote')); // (executed 50 times)
console.log(score = solution.call(post, 'score')); //