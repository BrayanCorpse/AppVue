Vue.component('tasks', {
    template: `
    <section class="todoapp">
    
        <header class="header">
            <h1>Tasks</h1>
            <input class="new-todo" type="text" id="" placeholder="New Task" v-on:keyup.enter="add" v-model="newTask">
        </header>
        <section>
            <ul class="todo-list">
                <li class="todo" is="task" v-for="task in tasks" :task="task" :key="task.id"></li>
             </ul>
        </section>
        <footer class="footer" v-show="tasks.length">
            <span class="todo-count">Completed: {{completed }} | Incompleted: {{incompleted }}</span>
 
        </footer>

    <!--         
            <br>

            <pre>
                {{$data}}
            </pre> -->


    </section>`,
  data: function(){
      return {
    newTask: "",
    tasks:[
        {title: "Learn PHP",completed: true},
        {title:"Learn Laravel",completed: true},
        {title:"Learn Vue.js",completed: false}
        ]
    }
},
methods: {
    add: function(){
        if(this.newTask.length <= 1) return alert('The task should not be empty');
        this.tasks.push({
            title: this.newTask,
            completed: false
        });
        this.newTask = "";
    },
},
  computed: {
    completed: function(){
        return this.tasks.filter(function(task){
            return task.completed;
        }).length;
    },
    incompleted: function(){
        return this.tasks.filter(function(task){
            return ! task.completed;
        }).length;
    }
}    

});

Vue.component('task', {
    props: ['task'],
    template: ` 
    <li :class="Classes">
        <div class="view">
            <input class="toggle" type="checkbox" v-model="task.completed" />
            <label v-text="task.title" @dblclick="edit()" ></label>
            <button class="destroy" @click="remove()"></button>
        </div>
        <input class="edit"
         v-model="task.title"
         @keyup.enter="doneEdit()"
         @blur="doneEdit()"
         @keyup.esc="cancelEdit()"/>
    </li>`,
    data: function(){
        return{
            editing: false,
            cacheBeforeEdit: ''
        }
    },
    methods: {
        edit: function(){
            this.cacheBeforeEdit = this.task.title;
            this.editing = true;
        },
        doneEdit: function(){
            if(! this.task.title)
            {
                this.remove();
            }
            this.editing = false;
        },
        cancelEdit: function(){
            this.editing = false;
            this.task.title = this.cacheBeforeEdit;
        },
        remove: function(){
           var tasks =  this.$parent.tasks;

           tasks.splice(tasks.indexOf(this.task), 1);
        }
    },
    computed: {
        Classes: function(){
     return {completed: this.task.completed, editing: this.editing};
        },
    }

});

var app  = new Vue ({
    el: '#app',
});
