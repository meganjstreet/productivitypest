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
    @lists = List.all
    @list = List.new(list_params)
    user_id = current_user.id

    @list.user_id = user_id
    respond_to do |format|
      if @list.save
        format.html { render partial: "lists/lists", locals: { lists: @lists, new_list: List.new, new_list_item: ListItem.new }, formats: [:html] }
        format.text { render partial: "lists/lists", locals: { lists: @lists, new_list: List.new, new_list_item: ListItem.new }, formats: [:html] }
      else
        format.html { render partial: "lists/lists", locals: { lists: @lists, new_list: @list, new_list_item: ListItem.new }, formats: [:html], status: :unprocessable_entity }
        format.text { render partial: "lists/lists", locals: { lists: @lists, new_list: @list, new_list_item: ListItem.new }, formats: [:html], status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @lists = List.all
    @list = List.find(params[:id])
    @list.destroy
    respond_to do |format|
      format.html { render partial: "lists/lists", locals: { lists: @lists, new_list: List.new, new_list_item: ListItem.new }, formats: [:html] }
      format.text { render partial: "lists/lists", locals: { lists: @lists, new_list: List.new, new_list_item: ListItem.new }, formats: [:html] }
    end
  end

private
# def set_list
#   @list = List.find(params[:id])
# end

  def list_params
    params.require(:list).permit(:name)
  end
end
