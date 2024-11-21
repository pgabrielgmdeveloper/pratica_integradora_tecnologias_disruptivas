import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';

const initialRows = [
  {
    idTarefa: 1,
    tituloTarefa: 'Tarefa 1',
    descricaoTarefa: 'Descrição da Tarefa 1',
    inicioTarefa: '2022-01-01',
    fimTarefa: '2022-01-02',
    statusTarefa: 'Concluída',
    recursoTarefa: 'Recurso 1',
  },
  {
    idTarefa: 2,
    tituloTarefa: 'Tarefa 2',
    descricaoTarefa: 'Descrição da Tarefa 2',
    inicioTarefa: '2022-01-03',
    fimTarefa: '2022-01-04',
    statusTarefa: 'Em Andamento',
    recursoTarefa: 'Recurso 2',
  },
  {
    idTarefa: 3,
    tituloTarefa: 'Tarefa 3',
    descricaoTarefa: 'Descrição da Tarefa 3',
    inicioTarefa: '2022-01-04',
    fimTarefa: '2022-01-05',
    statusTarefa: 'Em Andamento',
    recursoTarefa: 'Recurso 3',
  },
];

const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

  useEffect(() => {
    setTarefas(initialRows);
  }, []);

  const handleEditar = (id) => {
    const tarefaParaEditar = tarefas.find((tarefa) => tarefa.idTarefa === id);
    if (tarefaParaEditar) {
      setTarefaSelecionada(tarefaParaEditar);
      setOpenEditar(true);
    }
  };

  const handleDeletar = (id) => {
    setTarefas((current) => current.filter((tarefa) => tarefa.idTarefa !== id));
  };

  return (
    <Card>
      <CardHeader
        title="Gerenciamento de Tarefas"
        subheader="Acompanhe e organize suas tarefas"
        sx={{ backgroundColor: '#3f51b5', color: '#fff', textAlign:'center' }}
      />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="Tabela de Tarefas">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Título</TableCell>
                <TableCell align="right">Descrição</TableCell>
                <TableCell align="right">Início</TableCell>
                <TableCell align="right">Fim</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Recurso</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tarefas.map((row) => (
                <TableRow key={row.idTarefa}>
                  <TableCell>{row.idTarefa}</TableCell>
                  <TableCell>{row.tituloTarefa}</TableCell>
                  <TableCell align="right">{row.descricaoTarefa}</TableCell>
                  <TableCell align="right">{row.inicioTarefa}</TableCell>
                  <TableCell align="right">{row.fimTarefa}</TableCell>
                  <TableCell align="right">{row.statusTarefa}</TableCell>
                  <TableCell align="right">{row.recursoTarefa}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleEditar(row.idTarefa)}
                      startIcon={<EditIcon />}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeletar(row.idTarefa)}
                      startIcon={<DeleteIcon />}
                      sx={{ marginLeft: '8px' }}
                    >
                      Deletar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button size="medium" variant="contained" color="primary" onClick={() => setOpen(true)}>
          Criar Nova Tarefa
        </Button>
      </CardActions>

      {/* Modal de Criar Tarefa */}
      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="criar-tarefa">
        <Box sx={{ padding: '16px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: 24 }}>
          <CriarTarefa handleClose={() => setOpen(false)} tarefas={tarefas} setTarefas={setTarefas} />
        </Box>
      </Modal>

      {/* Modal de Editar Tarefa */}
      <Modal open={openEditar} onClose={() => setOpenEditar(false)} aria-labelledby="editar-tarefa">
        <Box sx={{ padding: '16px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: 24 }}>
          {tarefaSelecionada && (
            <EditarTarefa
              handleCloseEditar={() => setOpenEditar(false)}
              tarefa={tarefaSelecionada}
              tarefas={tarefas}
              setTarefas={setTarefas}
            />
          )}
        </Box>
      </Modal>
    </Card>
  );
};

export default ListarTarefa;
