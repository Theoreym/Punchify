const Category = require("../models/categoryModel");

module.exports = {
    getList: async (req, res) => {
        const navCategoryManage = true;
        const category = await Category.findAll({ raw: true });
        //console.log(category);
<<<<<<< HEAD
        res.render('category_manage', {category, navCategoryManage});
    },

    postCreate: async (req, res) => {
        //console.log(req.body);
=======
        res.render('category_manage', {category, navCategoryManage})
    },

    postCreate: async (req, res) => {
        //console.log(req.body)
>>>>>>> dc26be2b771865a997db1627b63cf2d258d5681a
        await Category.create({
            category_wording: req.body.category_wording.toLowerCase(),
            age_min: req.body.age_min,
            age_max: req.body.age_max
<<<<<<< HEAD
        });
        res.redirect('back');
=======
        })
        res.redirect('back')
>>>>>>> dc26be2b771865a997db1627b63cf2d258d5681a
    },

    postUpdate: async  (req, res) => {
        await Category.update({
            category_wording: req.body.category_wording_update.toLowerCase(),
            age_min: req.body.age_min_update,
            age_max: req.body.age_max_update
            },{where: {id_category: req.params.id_category}
        });
        res.redirect('back');
    },

    postDelete: async  (req, res) => {
        await Category.destroy({
            where:{id_category: req.params.id_category}
        });
        res.redirect('back');
    }
<<<<<<< HEAD
};
=======
}
>>>>>>> dc26be2b771865a997db1627b63cf2d258d5681a
