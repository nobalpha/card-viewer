// prettier-ignore
const ISO3Codes=["af","ax","al","dz","as","ad","ao","ai","aq","ag","ar","am","aw","au","at","az","bs","bh","bd","bb","by","be","bz","bj","bm","bt","bo","bq","ba","bw","bv","br","io","bn","bg","bf","bi","kh","cm","ca","cv","ky","cf","td","cl","cn","cx","cc","co","km","cg","cd","ck","cr","ci","hr","cu","cw","cy","cz","dk","dj","dm","do","ec","eg","sv","gq","er","ee","et","fk","fo","fj","fi","fr","gf","pf","tf","ga","gm","ge","de","gh","gi","gr","gl","gd","gp","gu","gt","gg","gn","gw","gy","ht","hm","va","hn","hk","hu","is","in","id","ir","iq","ie","im","il","it","jm","jp","je","jo","kz","ke","ki","kp","kr","xk","kw","kg","la","lv","lb","ls","lr","ly","li","lt","lu","mo","mk","mg","mw","my","mv","ml","mt","mh","mq","mr","mu","yt","mx","fm","md","mc","mn","me","ms","ma","mz","mm","na","nr","np","nl","an","nc","nz","ni","ne","ng","nu","nf","mp","no","om","pk","pw","ps","pa","pg","py","pe","ph","pn","pl","pt","pr","qa","rs","re","ro","ru","rw","bl","sh","kn","lc","mf","pm","vc","ws","sm","st","sa","sn","cs","sc","sl","sg","sx","sk","si","sb","so","za","gs","ss","es","lk","sd","sr","sj","sz","se","ch","sy","tw","tj","tz","th","tl","tg","tk","to","tt","tn","tr","xt","tm","tc","tv","ug","ua","ae","gb","us","um","uy","uz","vu","ve","vn","vg","vi","wf","eh","ye","zm","zw"];

function setCountryOption(el) {
  // Use ids instead of mass update
  // $(".will-be-added .field-label").empty();
  // const element = `<select class="selectpicker" data-width="fit"></select>`;
  // $(".will-be-added .field-label").append(element);
  for (let code of ISO3Codes) {
    const element = `<option value="${code}" data-content='<span class="flag-icon flag-icon-${code}"></span>'></option>`;
    el.append(element);
  }
  el.selectpicker();
}

$(document).on("change", ".checkbox input[type=checkbox]", function (e) {
  const current = e.currentTarget;
  $(current)
    .parent()
    .find("input[type=hidden]")
    .val($(e.currentTarget).prop("checked") ? "yes" : "no");
  e.preventDefault();
});

$(document).on("click", "div[id^=modal] .modal-adder button", function (e) {
  // #modal-* #modal-adder-*
  /* FIXME: Can't see first flags like Afghanistan */
  /* FIXME: When overflowing from modal body, make a scrollbar! */
  const element = `<div class="field is-horizontal will-be-added">
        <div class="field-label is-normal pt-0">
          <select class="selectpicker" data-width="fit">
          </select>
        </div>
        <div class="field-body">
          <div class="field translation">
            <div class="control is-expanded">
              <input class="input is-normal" name="${ISO3Codes[0]}-data" type="text" placeholder="Écrivez la traduction...">
            </div>
          </div>
          <div class="field validation mr-0">
            <div class="control is-expanded has-text-centered">
              <label class="checkbox is-centered">
              <input type="hidden" value="no" name="${ISO3Codes[0]}-validated">
                <input type="checkbox">
                Validate!
                <i class="fas fa-check-double"></i>
              </label>
            </div>
          </div>
          <div class="field">
            <div class="control has-text-centered">
              <label class="is-centered">
                <!-- How to center this!!!-->
                <button type="submit" class="button delete-entry" style="color: red;"><i class="far fa-times-circle"></i></button>    
              </label>
            </div>
          </div>
        </div>
      </div>`;

  $(element).insertBefore($(e.currentTarget).closest(".modal-adder"));

  setCountryOption(
    $(e.currentTarget)
      .closest("div[id^=modal]")
      .find(".modal-card-body div.will-be-added:last .selectpicker")
  );

  e.preventDefault();
});

$(document).on("change", ".selectpicker", function (e) {
  console.log("changed");
  const current = e.currentTarget;
  console.log(
    $(current)
      .closest(".will-be-added")
      .find(".field-body .translation input")
      .attr("name", `${current.value}-data`)
  );
  console.log(
    $(current)
      .closest(".will-be-added")
      .find(".field-body .validation input")
      .attr("name", `${current.value}-validated`)
  );
  e.preventDefault();
});

$(document).on("click", ".delete-entry", function (e) {
  $(e.currentTarget).closest(".is-horizontal").remove();
});

$(document).on("click", ".delete-modal", function (e) {
  console.log("Deleting modal");
  const current = e.currentTarget;
  console.log("modal button");
  document.documentElement.classList.add("is-clipped");
  console.log(document.querySelector($(current).attr("data-target")));
  document
    .querySelector($(current).attr("data-target"))
    .classList.remove("is-active");
});

$(document).on("click", ".modal-button", function (e) {
  const current = e.currentTarget;
  console.log("modal button");
  document.documentElement.classList.add("is-clipped");
  console.log(document.querySelector($(current).attr("data-target")));
  document
    .querySelector($(current).attr("data-target"))
    .classList.add("is-active");
});
