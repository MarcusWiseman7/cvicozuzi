const userSelect = '-password -verifyEmailToken -dateCreated -__v -loginToken';
// const userPopulate = {
//     path: 'teams pendingInvitations teamsIWantToJoin tribeMasterCompanyTeams',
//     populate: {
//         path: 'activeMembers inactiveMembers pendingMembers',
//         select: userSelect,
//     },
// };

module.exports = { userSelect };