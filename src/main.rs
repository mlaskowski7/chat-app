#[macro_use]
extern crate diesel;
use actix::*;
use actix_cors::Cors;
use actix_files::Files;
use actix_web::{web, http, App, HttpServer};
use diesel::{
    prelude::*,
    r2d2::{self, ConnectionManager}
};
mod db;
mod models;
mod routes;
mod schema;
mod server;
mod session;

#[actix_web::main]
async fn main() -> std::io::Result<()>{
    let server = server::C
}
