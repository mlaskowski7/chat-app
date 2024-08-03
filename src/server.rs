use std::collections::{HashMap, HashSet};
use serde_json::json;
use actix::prelude::*;
use rand::{self, rngs::ThreadRng, Rng};
use crate::session;

#[derive(Message)]
#[rtype(result ="()")]
pub struct Message(pub String);

#[derive(Message)]
#[rtype(usize)]
pub struct Connect {
    pub addr: Recipient<Message>
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct Disconnect {
    pub id: usize,
}

#[derive(Message)]
#[rtype(result="()")]
pub struct ClientMessage {
    pub id: usize,
    pub msg: String,
    pub room: String,
}

pub struct ListRooms;

impl actix::Message for ListRooms {
    type Result = Vec<String>;
}

#[derive(Message)]
#[rtype(result="()")]
pub struct Join {
    pub id: usize,
    pub name: String,
}

#[derive(Debug)]
pub struct ChatServer {
    sessions: HashMap<usize, Recipient<Message>>,
    rooms: HashMap<String, HashSet<usize>>,
    rng: ThreadRng,
}

impl ChatServer {
    pub fn new() -> ChatServer {
        let mut rooms = HashMap::new();
        rooms.insert("main".to_string(), HashSet::new());
        Self {
            sessions: HashMap::new(),
            rooms,
            rng: rand::thread_rng(),
        }
    }

    fn send_message(&self, room: &str, message: &str)
}