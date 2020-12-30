      <div id="list-demo">
            <button @click="add">Add</button>
            <button @click="remove">Remove</button>
            <transition-group name="list" tag="p">
              <span v-for="item in items" :key="item" class="list-item">
                {{ item }}
              </span>
            </transition-group>
          </div>