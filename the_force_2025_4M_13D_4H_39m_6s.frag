
//bottom-left
float get_bottom_left(vec2 st){
    vec3 color = vec3(0.0);
    vec2 bl = smoothstep(vec2(0.),vec2(0.5), st);
    float pct = bl.x * bl.y;
    vec2 tr = step(vec2(0.5), 1.0 - st);
    pct *= tr.x * tr.y;
    
    return pct;
}

//top-right
float get_top_right(vec2 st){
    vec2 bl2 = step(vec2(0.5), st);
    float pct = bl2.x * bl2.y;
    vec2 tr2 = smoothstep(vec2(0.0), vec2(0.5), 1.0-st);
    pct *= tr2.x * tr2.y;
    return pct;
}

//bottom-right
float get_bottom_right(vec2 st){
    float bl = step(0.5, 1.0 - st.y);
    float bl2 = step(0.5, st.x);
    float pct = bl * bl2;

    float brx = smoothstep(0.0, 0.5, st.y);
    float bry = smoothstep(0.0, 0.5, 1.0 - st.x);
    pct *= bry * brx;
    // pct = (abs(sin(time)), pct);
    
    return pct;
}

//top-left
float get_top_left(vec2 st){
    float bl = step(0.5, 1.0 - st.x);
    float bl2 = step(0.5, st.y);
    float pct = bl * bl2;
    float tly = smoothstep(0.0, 0.5, st.x);
    float tlx = smoothstep(0.0, 0.5, 1.0 - st.y);
    pct *= tly * tlx;
    return pct;
}

vec3 four_parts(vec2 st){
    float bottom = mix(get_bottom_right(st), get_bottom_left(st), abs(sin(time)));
    float top_right = get_top_right(st) * abs(sin(time));
    float top_left = get_top_left(st) * abs(cos(time));
    float colors = bottom + top_right + top_left;
    
    float time_const = abs(sin(time));
    time_const = min(0.5, time_const);
    float pct = smoothstep(time_const, 0., distance(st, vec2(0.5)));
    // colors = min(0.2, colors);
    pct = min(0., pct);
    // pct = min(0.1, abs(1.0 - pct));
    return vec3(colors + pct);
}

float center_circle(vec2 st){
    float pct = distance(st, vec2(0.5));
    pct = min(0.25, pct);
    pct = mod(20., 1.0 - pct);
    pct = max(0.55, pct * abs(cos(time)));
    return pct;
}

void main () {
    vec2 st = gl_FragCoord.xy / resolution;
    vec3 color = vec3(0.);
    color = four_parts(st);
    float pct = center_circle(st);
    // color *= vec3(pct);
    color /= vec3(pct);

    gl_FragColor = vec4(color,1.);
}

