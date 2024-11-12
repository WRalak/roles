import dbConnect from '../../utils/dbConnect';
import Entry from '../../models/Entry';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const { name, phone, country, date, time, idNumber } = req.body;
        const newEntry = new Entry({
          name,
          phone,
          country,
          date,
          time,
          idNumber
        });
        await newEntry.save();
        res.status(201).json({ success: true, data: newEntry });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        const { id, status, adminId, adminComment } = req.body;
        const updatedEntry = await Entry.findByIdAndUpdate(id, { status, adminId, adminComment }, { new: true });
        res.status(200).json({ success: true, data: updatedEntry });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: 'Invalid method' });
      break;
  }
}


  