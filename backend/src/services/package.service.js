import { Op } from 'sequelize'
import PackageModel from '@models/package'
import { PackageNotFoundError } from '@errors/package.errors'

const createPackage = async (insertData) => {
  return await PackageModel.create(insertData)
}

const listPackages = async (payload) => {
  const { limit, page, ...filter } = payload
  const offset = (page - 1) * limit

  if (filter.name) {
    filter.name = { [Op.iLike]: `%${filter.name}%` }
  }

  const { count, rows } = await PackageModel.findAndCountAll({
    where: filter,
    limit,
    offset,
    order: [['id', 'DESC']],
  })

  return {
    page,
    limit,
    total: count,
    data: rows,
  }
}

const getPackageById = async (id) => {
  const packageRecord = await PackageModel.findOne({ where: { id } })
  if (!packageRecord) {
    throw new PackageNotFoundError(id)
  }
  return packageRecord
}

const updatePackage = async (id, data) => {
  const packageRecord = await getPackageById(id)
  await packageRecord.update(data)
}

const deletePackage = async (id) => {
  const packageRecord = await packageService.getPackageById(id)
  await packageRecord.destroy()
}

const packageService = {
  createPackage,
  listPackages,
  getPackageById,
  updatePackage,
  deletePackage,
}

export default packageService
