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
    @lists = List.all.includes([:list_items])
    @list = List.new(list_params)
    @list.user = current_user
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

  def update
    @list = List.find(params[:id])
    @list.update(list_params)
    @lists = current_user.lists

    respond_to do |format|
      if @list.save
        partial_html = render_to_string(partial: "lists/lists",
                                        locals: { lists: @lists, new_list: List.new, new_list_item: ListItem.new },
                                        formats: [:html])
        format.json { render json: { partial_html: partial_html }, status: :ok }
      else
        partial_html = render_to_string(partial: "lists/lists",
                                        locals: { lists: @lists, new_list: List.new, new_list_item: ListItem.new },
                                        formats: [:html])
        format.json { render json: { partial_html: partial_html, errors: @list.errors.full_messages }, status: :unprocessable_entity }
      end
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
