class ListsController < ApplicationController
  # before_action :set_list, only: [ :new, :create, :update, :destroy]

  def lists
    @lists = @lists
  end

  def index
    @lists = List.all
  end

  def show
  end

  def new
    @list = List.new
  end

  def create
    @list = List.new(list_params)
    day_id = Day.last.id
    user_id = current_user.id
    @list.day_id = day_id
    @list.user_id = user_id
   if @list.save
    redirect_to root_path
    else
      render :home
    end
  end

  def edit
  end

 def update
    @list_item = List.find(params[:id])

    if @list_item.update(list_params)
    redirect_to list_path(@list_item)
    else
      render "edit"
    end
  end

  def destroy
    @task.destroy
    redirect_to lists_path
  end

private
# def set_list
#   @list = List.find(params[:id])
# end

  def list_params
    params.require(:list).permit(:name)
  end
end
